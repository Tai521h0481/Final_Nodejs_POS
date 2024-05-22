"use client";

import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TotalRevenue from "@/components/dashboard/totalRevenue";
import OverViewBarChart from "@/components/dashboard/overview-barchart";
import TotalRevenueOverview from "@/components/dashboard/totalRevenue";
import TotalRevenueToday from "@/components/dashboard/totalRevenue-today";
import TotalRevenueYesterday from "@/components/dashboard/totalRevenue-yesterday";
import TotalRevenue7Day from "@/components/dashboard/totalRevenue-7day";
import TotalRevenueMonth from "@/components/dashboard/totalRevenue-month";
import DataTableReportToday from "@/components/dashboard/data-table-report-today";
import DataTableReportYesterday from "@/components/dashboard/data-table-report-yesterday";
import DataTableReportMonth from "@/components/dashboard/data-table-report-month";
import DataTableReportWeek from "@/components/dashboard/data-table-report-week";
import CalendarDateRangePickerPage from "@/components/dashboard/calender-date-range-page";

export default function DashboardPage() {
  return (
    <>
      <motion.div
        className="flex"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        <div className="flex-1 pt-6 space-y-4">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="flex items-start justify-start gap-x-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="in 7 days">In 7 days</TabsTrigger>
              <TabsTrigger value="this month">This month</TabsTrigger>
              <TabsTrigger value="chooseDay">Choose day</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <TotalRevenueOverview />
              <OverViewBarChart />
            </TabsContent>
            <TabsContent value="today" className="space-y-4">
              <TotalRevenueToday />
              <DataTableReportToday></DataTableReportToday>
            </TabsContent>
            <TabsContent value="yesterday" className="space-y-4">
              <TotalRevenueYesterday />
              <DataTableReportYesterday />
            </TabsContent>
            <TabsContent value="in 7 days" className="space-y-4">
              <TotalRevenue7Day></TotalRevenue7Day>
              <DataTableReportWeek />
            </TabsContent>
            <TabsContent value="this month" className="space-y-4">
              <TotalRevenueMonth />
              <DataTableReportMonth />
            </TabsContent>
            <TabsContent value="chooseDay" className="space-y-4">
              <CalendarDateRangePickerPage />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </>
  );
}
