'use client'
import { UserData, UserFormType } from '@/lib/types'
import React, { useEffect, useRef, useState, useTransition } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateUserSchema } from '@/schemas'
import ProfileImage from './profile-image'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import SubmitButton from '../ui/submit-button'
import { updateUser } from '@/actions/user'
import { Button } from '../ui/button'
import { getSignedURL } from '@/actions/file'
import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'

type UpdateUserFormProps = {
  userData: UserData
}

const UpdateUserForm = ({ userData }: UpdateUserFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<boolean | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<UserFormType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: userData?.user?.name ?? '',
      email: userData?.user?.email ?? '',
      image: userData?.user?.image ?? '',
    },
  })

  const onSubmit = async (values: UserFormType) => {
    setError('')
    setSuccess(undefined)
    const signedUrl = await getSignedURL()

    if (signedUrl?.success?.url && selectedImage) {
      const url = signedUrl.success.url
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': selectedImage.type,
          },
          body: selectedImage,
        })
        if (!response.ok) {
          throw new Error('Upload failed with status ' + response.status)
        }
      } catch (error) {
        console.error('Error during file upload:', error)
        setError('Failed to upload image.')
      }
    }

    startTransition(() => {
      updateUser(values).then((data) => {
        setError(data?.error)
        setSuccess(!!data.user)
      })
    })
  }

  const onSubmit2 = async (values: UserFormType) => {
    setError('')
    setSuccess(undefined)
    const signedUrl = await getSignedURL()

    startTransition(async () => {
      if (signedUrl?.success?.url && selectedImage) {
        const url = signedUrl.success.url
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': selectedImage.type,
            },
            body: selectedImage,
          })
          if (!response.ok) {
            throw new Error('Upload failed with status ' + response.status)
          }
        } catch (error) {
          console.error('Error during file upload:', error)
          setError('Failed to upload image.')
        }
      }
      await updateUser(values).then((data) => {
        setError(data?.error)
        setSuccess(!!data.user)
      })
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files?.[0] ?? null)
  }

  return (
    <Card className="w-full md:max-w-[24rem]">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <CardDescription>Update your profile information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit2)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-row items-center gap-x-4">
                        <ProfileImage
                          profileImage={userData?.user?.image ?? null}
                          selectedImage={selectedImage}
                        />
                        <input
                          ref={inputRef}
                          type="file"
                          hidden
                          accept="image/jpeg image/jpg image/png"
                          onChange={handleChange}
                        />
                        <Button
                          type="button"
                          onClick={() => inputRef?.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {success && (
              <div className="w-full p-2 rounded-md bg-emerald-500/30 flex flex-row items-center gap-x-2 text-emerald-400 text-center">
                <CircleCheckIcon />
                <p className="text-center">Profile updated successfully!</p>
              </div>
            )}

            {error && (
              <div className="w-full p-2 rounded-md bg-rose-500/30 flex flex-row items-center gap-x-2 text-rose-400 text-center">
                <TriangleAlertIcon />
                <p className="text-center">{error}</p>
              </div>
            )}
            <SubmitButton isPending={isPending} className="w-full">
              Save
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UpdateUserForm
