import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";

type ProfileImageProps = {
  profileImage: string | null;
  selectedImage: File | null;
};

const ProfileImage = ({ profileImage, selectedImage }: ProfileImageProps) => {
  const { data: session } = useSession();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  console.log("session: ", session);

  useEffect(() => {
    if (selectedImage) {
      setSelectedImageUrl(URL.createObjectURL(selectedImage));
    }

    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImage]);

  return (
    <Avatar className="rounded-full w-20 h-20 p-[1px] border border-gray-50">
      <AvatarImage src={(selectedImageUrl || profileImage) ?? ""} />
      <AvatarFallback>
        {session?.user?.name?.split(" ").map((n) => n[0])}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileImage;
