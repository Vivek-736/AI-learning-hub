"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Loader2 } from "lucide-react";

type UserData = {
  id: number;
  userName: string;
  email: string;
  isMember: boolean;
  customerId?: string;
  studyMaterialsCount: number;
  chapterNotesCount: number;
  invoicesCount: number;
};

type AnalyticsData = {
  users: UserData[];
  totalStudyMaterials: number;
  totalChapterNotes: number;
  totalStudyTypeContents: number;
  totalInvoices: number;
  difficultyDistribution: { name: string; count: number }[];
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Failed to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="container mx-auto p-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold">{analyticsData.users.length}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{analyticsData.totalStudyMaterials}</p>
                <p className="text-sm text-gray-500">Total Study Materials</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{analyticsData.totalChapterNotes}</p>
                <p className="text-sm text-gray-500">Total Chapter Notes</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{analyticsData.totalInvoices}</p>
                <p className="text-sm text-gray-500">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Material Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.difficultyDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Study Materials</TableHead>
                  <TableHead>Chapter Notes</TableHead>
                  <TableHead>Invoices</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.isMember ? "default" : "secondary"}>
                        {user.isMember ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.customerId || "N/A"}</TableCell>
                    <TableCell>{user.studyMaterialsCount}</TableCell>
                    <TableCell>{user.chapterNotesCount}</TableCell>
                    <TableCell>{user.invoicesCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
