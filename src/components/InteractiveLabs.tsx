import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Plus, Minus, Cpu, Activity, Terminal, Radio } from 'lucide-react';

interface MemoryNode {
  id: string;
  value: number;
  address: string;
  nextAddress: string | null;
}

export const InteractiveLabs: React.FC<{ initialTab?: 'dsa' | 'iot' }> = ({ initialTab = 'dsa' }) => {
  const [activeLab, setActiveLab] = useState<'dsa' | 'iot'>(initialTab);

  useEffect(() => {
    setActiveLab(initialTab);
  }, [initialTab]);

  // --- LAB 1: DSA & Memory Pointer Visualizer State ---
  const [dsaMode, setDsaMode] = useState<'queue' | 'linkedlist' | 'stack'>('queue');
  const [inputValue, setInputValue] = useState<string>('42');
  const [operationLog, setOperationLog] = useState<string[]>([
    'Initialized 6-slot contiguous memory block [0x100 .. 0x150].',
    'Enqueued 14 at 0x100, 28 at 0x110, 35 at 0x120. FRONT = 0, REAR = 2.',
  ]);

  // Circular Queue State (Capacity 6)
  const CAPACITY = 6;
  const [queueBuffer, setQueueBuffer] = useState<(number | null)[]>([14, 28, 35, null, null, null]);
  const [frontIdx, setFrontIdx] = useState<number>(0);
  const [rearIdx, setRearIdx] = useState<number>(2);
  const [queueSize, setQueueSize] = useState<number>(3);

  // Linked List State
  const [linkedNodes, setLinkedNodes] = useState<MemoryNode[]>([
    { id: 'n1', value: 18, address: '0x2A0', nextAddress: '0x2D8' },
    { id: 'n2', value: 45, address: '0x2D8', nextAddress: '0x310' },
    { id: 'n3', value: 72, address: '0x310', nextAddress: null },
  ]);

  // Stack State
  const [stackFrames, setStackFrames] = useState<{ value: number; address: string }[]>([
    { value: 105, address: '0x7FF0' },
    { value: 210, address: '0x7FE8' },
    { value: 340, address: '0x7FE0' },
  ]);

  const handleInsert = () => {
    const num = parseInt(inputValue, 10);
    const val = Number.isNaN(num) ? Math.floor(Math.random() * 89) + 10 : num;

    if (dsaMode === 'queue') {
      if (queueSize === CAPACITY) {
        setOperationLog((prev) => [
          `OVERFLOW: Queue is full (size = ${CAPACITY}). Cannot enqueue ${val}.`,
          ...prev.slice(0, 6),
        ]);
        return;
      }
      const nextRear = frontIdx === -1 ? 0 : (rearIdx + 1) % CAPACITY;
      const nextFront = frontIdx === -1 ? 0 : frontIdx;
      const updated = [...queueBuffer];
      updated[nextRear] = val;
      setQueueBuffer(updated);
      setFrontIdx(nextFront);
      setRearIdx(nextRear);
      setQueueSize((s) => s + 1);
      const hexAddr = `0x${(256 + nextRear * 16).toString(16).toUpperCase()}`;
      setOperationLog((prev) => [
        `ENQUEUE(${val}): Wrote ${val} to ${hexAddr}. REAR = (${rearIdx} + 1) % 6 -> ${nextRear}.`,
        ...prev.slice(0, 6),
      ]);
    } else if (dsaMode === 'linkedlist') {
      if (linkedNodes.length >= 6) {
        setOperationLog((prev) => ['HEAP LIMIT: Maximum 6 nodes in demo view.', ...prev.slice(0, 6)]);
        return;
      }
      const newAddr = `0x${(672 + linkedNodes.length * 56).toString(16).toUpperCase()}`;
      const updated = linkedNodes.map((n, idx) =>
        idx === linkedNodes.length - 1 ? { ...n, nextAddress: newAddr } : n
      );
      updated.push({ id: `n_${Date.now()}`, value: val, address: newAddr, nextAddress: null });
      setLinkedNodes(updated);
      setOperationLog((prev) => [
        `APPEND(${val}): Allocated node at ${newAddr}; linked previous TAIL->next = ${newAddr}.`,
        ...prev.slice(0, 6),
      ]);
    } else {
      if (stackFrames.length >= 6) {
        setOperationLog((prev) => ['STACK OVERFLOW: Maximum 6 stack frames.', ...prev.slice(0, 6)]);
        return;
      }
      const newAddr = `0x${(32752 - stackFrames.length * 8).toString(16).toUpperCase()}`;
      setStackFrames((prev) => [...prev, { value: val, address: newAddr }]);
      setOperationLog((prev) => [
        `PUSH(${val}): Decremented SP to ${newAddr}; stored ${val} at TOP.`,
        ...prev.slice(0, 6),
      ]);
    }
    setInputValue(String(Math.floor(Math.random() * 89) + 10));
  };

  const handleRemove = () => {
    if (dsaMode === 'queue') {
      if (queueSize === 0 || frontIdx === -1) {
        setOperationLog((prev) => ['UNDERFLOW: Queue is empty. FRONT == -1.', ...prev.slice(0, 6)]);
        return;
      }
      const removedVal = queueBuffer[frontIdx];
      const hexAddr = `0x${(256 + frontIdx * 16).toString(16).toUpperCase()}`;
      const updated = [...queueBuffer];
      updated[frontIdx] = null;

      if (queueSize === 1) {
        setQueueBuffer(updated);
        setFrontIdx(-1);
        setRearIdx(-1);
        setQueueSize(0);
        setOperationLog((prev) => [
          `DEQUEUE() -> ${removedVal} from ${hexAddr}. Queue now empty; reset FRONT = -1, REAR = -1.`,
          ...prev.slice(0, 6),
        ]);
      } else {
        const nextFront = (frontIdx + 1) % CAPACITY;
        setQueueBuffer(updated);
        setFrontIdx(nextFront);
        setQueueSize((s) => s - 1);
        setOperationLog((prev) => [
          `DEQUEUE() -> ${removedVal} from ${hexAddr}. Advanced FRONT = (${frontIdx} + 1) % 6 -> ${nextFront}.`,
          ...prev.slice(0, 6),
        ]);
      }
    } else if (dsaMode === 'linkedlist') {
      if (linkedNodes.length === 0) {
        setOperationLog((prev) => ['UNDERFLOW: Linked List HEAD == nullptr.', ...prev.slice(0, 6)]);
        return;
      }
      const removed = linkedNodes[0];
      const remaining = linkedNodes.slice(1);
      setLinkedNodes(remaining);
      setOperationLog((prev) => [
        `DELETE_HEAD(): Freed ${removed.address} (val=${removed.value}). New HEAD = ${
          remaining[0]?.address || 'nullptr'
        }.`,
        ...prev.slice(0, 6),
      ]);
    } else {
      if (stackFrames.length === 0) {
        setOperationLog((prev) => ['STACK UNDERFLOW: SP at base.', ...prev.slice(0, 6)]);
        return;
      }
      const popped = stackFrames[stackFrames.length - 1];
      setStackFrames((prev) => prev.slice(0, -1));
      setOperationLog((prev) => [
        `POP() -> ${popped.value} from ${popped.address}. Reclaimed stack frame.`,
        ...prev.slice(0, 6),
      ]);
    }
  };

  const handleResetDsa = () => {
    setQueueBuffer([14, 28, 35, null, null, null]);
    setFrontIdx(0);
    setRearIdx(2);
    setQueueSize(3);
    setLinkedNodes([
      { id: 'n1', value: 18, address: '0x2A0', nextAddress: '0x2D8' },
      { id: 'n2', value: 45, address: '0x2D8', nextAddress: '0x310' },
      { id: 'n3', value: 72, address: '0x310', nextAddress: null },
    ]);
    setStackFrames([
      { value: 105, address: '0x7FF0' },
      { value: 210, address: '0x7FE8' },
      { value: 340, address: '0x7FE0' },
    ]);
    setOperationLog(['Reset memory registers to initial state.']);
  };

  // --- LAB 2: IoT Telemetry Simulator State ---
  const [iotRunning, setIotRunning] = useState<boolean>(true);
  const [smoothingEnabled, setSmoothingEnabled] = useState<boolean>(true);
  const [telemetryHistory, setTelemetryHistory] = useState<
    { timestamp: string; temp: number; humidity: number; ppm: number; rssi: number; status: string }[]
  >([
    { timestamp: '12:04:10', temp: 27.4, humidity: 62.0, ppm: 142, rssi: -54, status: 'NOMINAL' },
    { timestamp: '12:04:12', temp: 27.5, humidity: 61.8, ppm: 145, rssi: -53, status: 'NOMINAL' },
    { timestamp: '12:04:14', temp: 27.4, humidity: 62.1, ppm: 140, rssi: -55, status: 'NOMINAL' },
    { timestamp: '12:04:16', temp: 27.6, humidity: 61.9, ppm: 144, rssi: -54, status: 'NOMINAL' },
  ]);

  useEffect(() => {
    if (!iotRunning || activeLab !== 'iot') return;
    const interval = setInterval(() => {
      setTelemetryHistory((prev) => {
        const last = prev[prev.length - 1] || { temp: 27.5, humidity: 62, ppm: 142, rssi: -54 };
        const jitter = smoothingEnabled ? 0.25 : 1.4;
        const nextTemp = Number((27.5 + (Math.random() - 0.48) * jitter).toFixed(2));
        const nextHum = Number((62.0 + (Math.random() - 0.5) * (jitter * 2)).toFixed(1));
        const nextPpm = Math.max(110, Math.round(145 + (Math.random() - 0.48) * (smoothingEnabled ? 8 : 35)));
        const nextRssi = Math.round(-54 + (Math.random() - 0.5) * 4);
        const now = new Date();
        const ts = now.toTimeString().split(' ')[0];
        const status = nextTemp > 32 || nextPpm > 280 ? 'THRESHOLD ALERT' : 'NOMINAL';
        return [...prev.slice(-7), { timestamp: ts, temp: nextTemp, humidity: nextHum, ppm: nextPpm, rssi: nextRssi, status }];
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [iotRunning, smoothingEnabled, activeLab]);

  const triggerThermalAnomaly = () => {
    const now = new Date().toTimeString().split(' ')[0];
    setTelemetryHistory((prev) => [
      ...prev.slice(-7),
      {
        timestamp: now,
        temp: 34.8,
        humidity: 48.5,
        ppm: 315,
        rssi: -52,
        status: 'THRESHOLD ALERT',
      },
    ]);
  };

  const latestTelemetry = telemetryHistory[telemetryHistory.length - 1];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1422] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
            Interactive Engineering Workbench · Live Browser Execution
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Test Monirul’s Core Engineering Systems Live
          </h3>
        </div>

        {/* Functional Segmented Lab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveLab('dsa')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeLab === 'dsa'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>01. DSA Memory Pointer Visualizer</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLab('iot')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
              activeLab === 'iot'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>02. ESP32 IoT Telemetry Stream</span>
          </button>
        </div>
      </div>

      {activeLab === 'dsa' ? (
        <div className="space-y-6">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDsaMode('queue')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  dsaMode === 'queue'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Circular Queue (FRONT / REAR)
              </button>
              <button
                type="button"
                onClick={() => setDsaMode('linkedlist')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  dsaMode === 'linkedlist'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Singly Linked List (HEAD / NEXT)
              </button>
              <button
                type="button"
                onClick={() => setDsaMode('stack')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  dsaMode === 'stack'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Call Stack (LIFO / TOP)
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Node numeric value"
                className="w-20 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="Val"
              />
              <button
                type="button"
                onClick={handleInsert}
                className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{dsaMode === 'queue' ? 'Enqueue' : dsaMode === 'linkedlist' ? 'Append Node' : 'Push Frame'}</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>{dsaMode === 'queue' ? 'Dequeue' : dsaMode === 'linkedlist' ? 'Delete Head' : 'Pop Frame'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetDsa}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Visual Memory Canvas Area */}
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800/90 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span>
                Architecture:{' '}
                <strong className="text-slate-900 dark:text-white">
                  {dsaMode === 'queue'
                    ? 'Circular Ring Buffer (O(1) Enqueue/Dequeue)'
                    : dsaMode === 'linkedlist'
                    ? 'Dynamic Heap Nodes with Next-Pointer Addresses'
                    : 'Contiguous LIFO Stack Frames'}
                </strong>
              </span>
              {dsaMode === 'queue' && (
                <span>
                  Registers: <strong className="text-emerald-600 dark:text-emerald-400">FRONT = {frontIdx}</strong> ·{' '}
                  <strong className="text-amber-600 dark:text-amber-400">REAR = {rearIdx}</strong> ·{' '}
                  <strong className="text-indigo-600 dark:text-indigo-400">SIZE = {queueSize}/6</strong>
                </span>
              )}
            </div>

            {dsaMode === 'queue' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {queueBuffer.map((val, idx) => {
                  const isFront = idx === frontIdx && queueSize > 0;
                  const isRear = idx === rearIdx && queueSize > 0;
                  const addr = `0x${(256 + idx * 16).toString(16).toUpperCase()}`;
                  return (
                    <div
                      key={addr}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between min-h-[116px] ${
                        val !== null
                          ? 'bg-white dark:bg-slate-900 border-indigo-500/60 shadow-xs'
                          : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        <span>[{idx}]</span>
                        <span>{addr}</span>
                      </div>
                      <div className="my-2 text-center font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                        {val !== null ? val : '—'}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-semibold h-4">
                        {isFront && <span className="text-emerald-600 dark:text-emerald-400">▲ FRONT</span>}
                        {isRear && <span className="text-amber-600 dark:text-amber-400">▲ REAR</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {dsaMode === 'linkedlist' && (
              <div className="flex flex-wrap items-center gap-3">
                {linkedNodes.length === 0 ? (
                  <div className="py-8 text-center w-full font-mono text-xs text-slate-500">
                    HEAD == nullptr (Heap Empty — Click Append Node)
                  </div>
                ) : (
                  linkedNodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-indigo-500/50 min-w-[145px] space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          <span>ADDR: {node.address}</span>
                          {index === 0 && <strong className="text-emerald-600 dark:text-emerald-400">HEAD</strong>}
                          {index === linkedNodes.length - 1 && (
                            <strong className="text-amber-600 dark:text-amber-400">TAIL</strong>
                          )}
                        </div>
                        <div className="text-xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                          data: {node.value}
                        </div>
                        <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                          next: {node.nextAddress ?? 'nullptr'}
                        </div>
                      </div>
                      {index < linkedNodes.length - 1 && (
                        <div className="font-mono text-xs text-slate-400 font-bold">───►</div>
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            )}

            {dsaMode === 'stack' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {stackFrames.map((frame, idx) => {
                  const isTop = idx === stackFrames.length - 1;
                  return (
                    <div
                      key={frame.address}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between min-h-[110px] ${
                        isTop
                          ? 'bg-white dark:bg-slate-900 border-emerald-500/70'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>SP#{idx}</span>
                        <span>{frame.address}</span>
                      </div>
                      <div className="text-center font-mono text-2xl font-bold text-slate-900 dark:text-white tabular-nums my-2">
                        {frame.value}
                      </div>
                      <div className="text-center text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 h-4">
                        {isTop ? '◄ TOP OF STACK' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Execution Trace Terminal */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Memory Execution Trace
                </span>
                <span>C++20 / ES6 Pointer Model</span>
              </div>
              {operationLog.map((entry, i) => (
                <div key={i} className={i === 0 ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                  {`[${operationLog.length - i}] ${entry}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* LAB 2: ESP32 IoT Telemetry Simulator */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
              Node ID: <strong className="text-slate-900 dark:text-white">PUST-ICE-LAB-ESP32-01</strong> · Broker Topic:{' '}
              <code className="text-indigo-600 dark:text-indigo-400">pust/ice/telemetry/node01</code>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSmoothingEnabled((s) => !s)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  smoothingEnabled
                    ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                5-Point Moving Average ADC Filter: {smoothingEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                type="button"
                onClick={triggerThermalAnomaly}
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                Simulate Thermal & Gas Spike
              </button>
              <button
                type="button"
                onClick={() => setIotRunning((r) => !r)}
                className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{iotRunning ? 'Pause Stream' : 'Resume Stream'}</span>
              </button>
            </div>
          </div>

          {/* 4-Column Live Sensor Readout */}
          {latestTelemetry && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Temperature (DHT22)</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1 block">
                  {latestTelemetry.temp} °C
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">Calibrated ±0.2°C</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Relative Humidity</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1 block">
                  {latestTelemetry.humidity} %
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">ICE Lab Standard</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Air Quality (MQ-135)</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1 block">
                  {latestTelemetry.ppm} PPM
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">Threshold &lt; 280 PPM</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Telemetry State</span>
                <span
                  className={`text-lg font-bold tabular-nums mt-1.5 block ${
                    latestTelemetry.status === 'NOMINAL'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {latestTelemetry.status}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">RSSI: {latestTelemetry.rssi} dBm</span>
              </div>
            </div>
          )}

          {/* Live MQTT Payload Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-4">Timestamp</th>
                  <th className="py-2.5 px-4">Temp (°C)</th>
                  <th className="py-2.5 px-4">Humidity (%)</th>
                  <th className="py-2.5 px-4">MQ-135 (PPM)</th>
                  <th className="py-2.5 px-4">RSSI (dBm)</th>
                  <th className="py-2.5 px-4">Diagnostic State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/70">
                {telemetryHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
                    <td className="py-2 px-4 text-slate-600 dark:text-slate-400">{row.timestamp}</td>
                    <td className="py-2 px-4 font-semibold text-slate-900 dark:text-white">{row.temp.toFixed(2)}</td>
                    <td className="py-2 px-4 text-slate-700 dark:text-slate-300">{row.humidity.toFixed(1)}</td>
                    <td className="py-2 px-4 font-semibold text-slate-900 dark:text-white">{row.ppm}</td>
                    <td className="py-2 px-4 text-slate-600 dark:text-slate-400">{row.rssi} dBm</td>
                    <td
                      className={`py-2 px-4 font-semibold ${
                        row.status === 'NOMINAL'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
