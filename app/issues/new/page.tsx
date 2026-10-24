"use client"

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import axios from "axios" // 👈 Imported axios

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

// Dynamically import SimpleMDE so it only loads on the client side
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Bug title must be at least 1 character.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(100, "Description must be at most 100 characters."),
})

type IssueForm = z.infer<typeof formSchema>;

export default function NewIssueForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<IssueForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  // 🚀 Backend API Submission Handler using Axios
  async function onSubmit(data: IssueForm) {
    setIsSubmitting(true);
    try {
      // Axios automatically stringifies the body and sets Content-Type to application/json
      const response = await axios.post("/api/issues", data);

      toast.success("Issue reported successfully!", {
        description: "Thank you for helping us improve.",
        position: "bottom-right",
      });

      // Clear the form after successful submission
      form.reset();
      router.push("/issues");
    } catch (error: any) {
      // Axios error handling captures server error messages cleanly
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Something went wrong. Please try again.";

      toast.error("Submission failed", {
        description: errorMessage,
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-6">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Issue Report</CardTitle>
          <CardDescription>
            Help us improve by reporting issues you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Issue Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Issue title..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Description
                    </FieldLabel>
                    <SimpleMDE
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="description"
                    />
                    <FieldDescription>
                      Include steps to reproduce, expected behavior, and what
                      actually happened.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}