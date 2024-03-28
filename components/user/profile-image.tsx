import React, { useRef } from "react";

const ProfileImage = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  return <input hidden ref={inputFileRef}></input>;
};

export default ProfileImage;
