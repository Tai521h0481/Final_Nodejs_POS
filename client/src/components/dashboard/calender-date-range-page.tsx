"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import TotalRevenueRange from "./totalRevenue-range";
import DataTableReportRange from "./data-table-report-range";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getCookie } from "cookies-next";
import axios from "axios";
import toast from "react-hot-toast";

const FormSchema = z.object({
  dateStart: z.date(),
  dateEnd: z.date(),
});

const CalendarDateRangePickerPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const token = getCookie("token");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      axios
        .post(
          `/api/reports/from-to`,
          {
            from: format(data.dateStart, "MM/dd/yyyy"),
            to: format(data.dateEnd, "MM/dd/yyyy"),
          },
          {
            baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setData(response?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-4 mb-5"
        >
          <FormField
            control={form.control}
            name="dateStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateEnd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button type="submit" className="translate-y-3">
            Submit
          </Button>
        </form>
      </Form>
      {data && (
        <>
          <TotalRevenueRange data={data} />
          <DataTableReportRange data={data} />
        </>
      )}
    </div>
  );
};

export default CalendarDateRangePickerPage;
