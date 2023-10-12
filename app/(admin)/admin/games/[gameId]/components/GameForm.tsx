"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Game, Image } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";
import Heading from "@/components/ui/heading";
import { Loader2, Trash } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(40),
  description: z.string().min(2).max(1000),
  features: z.string().min(2).max(1000),
  categoryId: z.string().min(1),
  bannerImg: z.string(),
  logoImg: z.string(),
  titleImg: z.string(),  
  images: z.object({ url: z.string() }).array(),
  releaseDate: z.number().min(1),
  price: z.coerce.number().min(1),
  discount: z.coerce.number(),
  rating: z.coerce.number().min(1),
  developer: z.string().min(1),
  size: z.coerce.number().min(1),
});

interface GamesFormProps {
  initialData?:
    | (Game & {
        images: Image[];
      })
    | null;
  categories?: Category[];
}

const GameForm: React.FC<GamesFormProps> = ({ initialData, categories }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit game" : "Create game";
  const description = initialData ? "Edit your game." : "Add a new game";
  const toastMessage = initialData ? "Game updated." : "Game created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
  ? {
      title: initialData.title || "",
      description: initialData.description || "",
      features: initialData.features || "",
      releaseDate: initialData.releaseDate || 0,
      price: initialData.price || 0,
      discount: initialData.discount || 0,
      rating: initialData.rating || 0,
      developer: initialData.developer || "",
      size: initialData.size || 0,
      categoryId: initialData.categoryId || "",
      logoImg: initialData.logoImg || "",
      bannerImg: initialData.bannerImg || "",
      titleImg: initialData.titleImg || "",
      images: initialData.images || [],
    }
  : {
      title: "",
      description: "",
      features: "",
      releaseDate: 0,
      price: 0,
      discount: 0,
      rating: 0,
      developer: "",
      size: 0,
      categoryId: "",
      logoImg: "",
      bannerImg: "",
      titleImg: "",
      images: [],
    };

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
        setLoading(true)
        if (initialData) {
          await axios.patch(`/api/games/${params.gameId}`, data);
        } else {
          await axios.post("/api/games", data);
        }
        router.refresh();
        router.push("/admin/games");
        toast({ description: toastMessage })
      } catch (error) {
        setLoading(false)
        toast({ variant: "destructive", description: "Something went wrong"})
      } finally {
        setLoading(false)
      }
    };

    const onDelete = async () => {
      try {
        setLoading(true)
        await axios.delete(`/api/games/${params.gameId}`);
        router.refresh();
        router.push("/admin/games");
        toast({ description: "Game deleted" })
      } catch (error) {
        setLoading(false)
        toast({ variant: "destructive", description: "Game not deleted"})
      } finally {
        setLoading(false)
      }
    };

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-4 grid grid-cols-2 items-center gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game title</FormLabel>
                <FormControl>
                  <Input placeholder="game title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="describe..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="write features" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="9,99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="9,99%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="4/5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="developer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="how many gigs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Date</FormLabel>
                <Select
                  onValueChange={(event: string | number) =>
                    field.onChange(Number(event))
                  }
                  value={field.value.toString()}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value.toString()}
                        placeholder="Select the year"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, index) => 1999 + index).map(
                      (year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="bannerImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []} // Pass the value as an array
                      onChange={(url) => field.onChange(url)} // Simply update the URL value
                      onRemove={() => field.onChange("")} // Clear the URL value to remove the image
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="logoImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []} // Pass the value as an array
                    onChange={(url) => field.onChange(url)} // Simply update the URL value
                    onRemove={() => field.onChange("")} // Clear the URL value to remove the image
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []} // Pass the value as an array
                    onChange={(url) => field.onChange(url)} // Simply update the URL value
                    onRemove={() => field.onChange("")} // Clear the URL value to remove the image
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...(field.value || []), { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (current) => current.url !== url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GameForm;