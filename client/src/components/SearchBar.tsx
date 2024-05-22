import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search } from "lucide-react";

const formSchema = z.object({
  search: z.string(),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="relative">
      <Form {...form}>
        <form onChange={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex min-w-[600px] items-center w-full px-4 py-2 border rounded-lg border-zinc-400 gap-x-3">
                <FormLabel className="flex items-center justify-center opacity-50">
                  <Search />
                </FormLabel>
                <FormControl>
                  <input
                    className="!mt-0 bg-transparent outline-none w-full"
                    type="text"
                    placeholder="Search..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
