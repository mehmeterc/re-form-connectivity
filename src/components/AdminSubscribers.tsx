
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, RefreshCw, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  language: string;
  source: string;
  status: string;
}

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) {
        console.error('Error fetching subscribers:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch subscribers',
          variant: 'destructive'
        });
        return;
      }

      setSubscribers(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch subscribers',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Language', 'Source', 'Status', 'Subscribed At'].join(','),
      ...subscribers.map(sub => [
        sub.email,
        sub.language,
        sub.source,
        sub.status,
        new Date(sub.subscribed_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const activeSubscribers = subscribers.filter(sub => sub.status === 'active');

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Newsletter Subscribers Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscribers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscribers.filter(sub => 
                  new Date(sub.subscribed_at).getMonth() === new Date().getMonth()
                ).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-6">
          <Button onClick={fetchSubscribers} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportSubscribers} variant="outline" disabled={subscribers.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading subscribers...</div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No subscribers yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Email</th>
                    <th className="text-left p-4 font-medium">Language</th>
                    <th className="text-left p-4 font-medium">Source</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-mono text-sm">{subscriber.email}</td>
                      <td className="p-4">
                        <Badge variant="outline">
                          {subscriber.language.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{subscriber.source}</td>
                      <td className="p-4">
                        <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                          {subscriber.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSubscribers;
