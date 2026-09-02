"use client";

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Drawer from '@/components/ui/Drawer';

export default function DrawerTest() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [rawModalOpen, setRawModalOpen] = useState(false);

    return (
        <div className="p-10 flex gap-4">
            <Button onClick={() => setDrawerOpen(true)}>Open Drawer (Component)</Button>
            <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Test Drawer">
                <p>Hello from the Drawer</p>
            </Drawer>

            <Button onClick={() => setRawModalOpen(true)}>Open Raw Modal Test</Button>
            {rawModalOpen && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onClick={() => setRawModalOpen(false)}
                >
                    <div
                        style={{
                            background: 'white', padding: 40, borderRadius: 12,
                            color: 'black', minWidth: 300,
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3>Raw modal works!</h3>
                        <p>If you see this but not the Drawer, the issue is in Drawer/react-modal.</p>
                        <button onClick={() => setRawModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
