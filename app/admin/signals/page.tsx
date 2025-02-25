'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function AdminSignalsPage() {
  const [signals, setSignals] = useState([
    {
      id: 1,
      pair: 'EUR/USD',
      type: 'BUY',
      entry: '1.2000',
      stopLoss: '1.1950',
      takeProfit: '1.2100',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentSignal, setCurrentSignal] = useState({
    id: 0,
    pair: '',
    type: '',
    entry: '',
    stopLoss: '',
    takeProfit: '',
    status: 'active',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setSignals(signals.map(signal => 
        signal.id === currentSignal.id ? currentSignal : signal
      ));
    } else {
      setSignals([...signals, { ...currentSignal, id: Date.now() }]);
    }
    setIsEditing(false);
    setCurrentSignal({ 
      id: 0, 
      pair: '', 
      type: '', 
      entry: '', 
      stopLoss: '', 
      takeProfit: '', 
      status: 'active',
      image: '',
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Manage Signals</h2>
        <Button onClick={() => setIsEditing(false)}>
          <Plus className="mr-2 h-4 w-4" /> Add Signal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Signal' : 'Add New Signal'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pair">Currency Pair</Label>
                <Input
                  id="pair"
                  value={currentSignal.pair}
                  onChange={(e) => setCurrentSignal({ ...currentSignal, pair: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={currentSignal.type}
                  onValueChange={(value) => setCurrentSignal({ ...currentSignal, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">BUY</SelectItem>
                    <SelectItem value="SELL">SELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry">Entry Price</Label>
                <Input
                  id="entry"
                  value={currentSignal.entry}
                  onChange={(e) => setCurrentSignal({ ...currentSignal, entry: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss</Label>
                <Input
                  id="stopLoss"
                  value={currentSignal.stopLoss}
                  onChange={(e) => setCurrentSignal({ ...currentSignal, stopLoss: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="takeProfit">Take Profit</Label>
                <Input
                  id="takeProfit"
                  value={currentSignal.takeProfit}
                  onChange={(e) => setCurrentSignal({ ...currentSignal, takeProfit: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Chart Image URL</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/chart-image.jpg"
                value={currentSignal.image}
                onChange={(e) => setCurrentSignal({ ...currentSignal, image: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              {isEditing ? 'Update' : 'Add'} Signal
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {signals.map((signal) => (
          <Card key={signal.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {signal.image && (
                  <div className="relative w-full md:w-[200px] h-[200px] md:h-[150px] rounded-lg overflow-hidden">
                    <Image
                      src={signal.image}
                      alt={`Chart for ${signal.pair}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="w-full sm:w-auto">
                      <h3 className="font-semibold text-lg">{signal.pair}</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          signal.type === 'BUY' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {signal.type}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">Entry: {signal.entry}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">SL: {signal.stopLoss}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full">TP: {signal.takeProfit}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentSignal(signal);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setSignals(signals.filter(s => s.id !== signal.id))}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}