"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { sidebarPresenceVariants } from "@/lib/data";
import { useSidebarContext } from "@/context/sidebar-presence-context";
import ChatInput from "./chat-input";
import { ChatById } from "@/lib/types";

type ChatMessageProps = {
  chat: ChatById;
};

const Chat = ({ chat }: ChatMessageProps) => {
  const { isSidebarOpen } = useSidebarContext();
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="mb-20">
      <motion.div
        variants={sidebarPresenceVariants}
        animate={isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}
        initial="sidebarClosed"
        className="h-full pt-10"
      >
        <p className="container max-w-3xl">
          Non sit aute proident id sit in officia. Quis nulla consequat amet est
          sint ea. Tempor eiusmod est excepteur laboris sunt. Mollit tempor
          voluptate ad consectetur nisi. Magna id amet duis voluptate excepteur
          esse. Adipisicing nisi commodo enim sint nostrud cillum laborum elit
          ea eu exercitation ea consequat est. Eu proident consectetur proident
          dolore anim amet est dolor nulla exercitation excepteur aliquip
          consectetur exercitation. Fugiat pariatur velit est dolore. Ea ut
          dolor nostrud adipisicing quis qui eu veniam ullamco qui. Mollit ipsum
          velit eiusmod esse sit eu qui ipsum magna ullamco quis. Reprehenderit
          aliqua nostrud sit commodo nostrud nostrud aliqua. Labore qui irure
          voluptate labore consectetur. Esse consequat fugiat amet amet laboris
          consequat sunt. Labore eiusmod aliqua ea ea minim. Incididunt esse
          deserunt aliqua eu. Enim aliqua ut magna ad irure est cupidatat.
          Exercitation sit nostrud eiusmod elit voluptate ut eu eiusmod ut
          dolore dolore magna eiusmod. Aliquip consectetur dolore ea magna eu
          anim nostrud aute consectetur nulla exercitation occaecat veniam
          cupidatat. Aliquip adipisicing irure pariatur laboris. Reprehenderit
          est qui ipsum minim dolor officia ea consequat deserunt duis ipsum
          sunt nulla. Sint ea sint elit Lorem consectetur cillum in ad
          consectetur ullamco dolore. Proident dolore sunt non non excepteur ut
          amet. Pariatur dolore cupidatat enim exercitation. Reprehenderit id
          irure veniam ut laboris adipisicing incididunt id consectetur
          voluptate enim mollit. Sint dolore elit velit et commodo incididunt ad
          anim cupidatat Lorem. Adipisicing quis duis dolor consequat proident
          qui tempor nostrud. Ut reprehenderit exercitation do et exercitation
          sint dolor proident id adipisicing exercitation. Non sit aute proident
          id sit in officia. Quis nulla consequat amet est sint ea. Tempor
          eiusmod est excepteur laboris sunt. Mollit tempor voluptate ad
          consectetur nisi. Magna id amet duis voluptate excepteur esse.
          Adipisicing nisi commodo enim sint nostrud cillum laborum elit ea eu
          exercitation ea consequat est. Eu proident consectetur proident dolore
          anim amet est dolor nulla exercitation excepteur aliquip consectetur
          exercitation. Fugiat pariatur velit est dolore. Ea ut dolor nostrud
          adipisicing quis qui eu veniam ullamco qui. Mollit ipsum velit eiusmod
          esse sit eu qui ipsum magna ullamco quis. Reprehenderit aliqua nostrud
          sit commodo nostrud nostrud aliqua. Labore qui irure voluptate labore
          consectetur. Esse consequat fugiat amet amet laboris consequat sunt.
          Labore eiusmod aliqua ea ea minim. Incididunt esse deserunt aliqua eu.
          Enim aliqua ut magna ad irure est cupidatat. Exercitation sit nostrud
          eiusmod elit voluptate ut eu eiusmod ut dolore dolore magna eiusmod.
          Aliquip consectetur dolore ea magna eu anim nostrud aute consectetur
          nulla exercitation occaecat veniam cupidatat. Aliquip adipisicing
          irure pariatur laboris. Reprehenderit est qui ipsum minim dolor
          officia ea consequat deserunt duis ipsum sunt nulla. Sint ea sint elit
          Lorem consectetur cillum in ad consectetur ullamco dolore. Proident
          dolore sunt non non excepteur ut amet. Pariatur dolore cupidatat enim
          exercitation. Reprehenderit id irure veniam ut laboris adipisicing
          incididunt id consectetur voluptate enim mollit. Sint dolore elit
          velit et commodo incididunt ad anim cupidatat Lorem. Adipisicing quis
          duis dolor consequat proident qui tempor nostrud. Ut reprehenderit
          exercitation do et exercitation sint dolor proident id adipisicing
          exercitation. Non sit aute proident id sit in officia. Quis nulla
          consequat amet est sint ea. Tempor eiusmod est excepteur laboris sunt.
          Mollit tempor voluptate ad consectetur nisi. Magna id amet duis
          voluptate excepteur esse. Adipisicing nisi commodo enim sint nostrud
          cillum laborum elit ea eu exercitation ea consequat est. Eu proident
          consectetur proident dolore anim amet est dolor nulla exercitation
          excepteur aliquip consectetur exercitation. Fugiat pariatur velit est
          dolore. Ea ut dolor nostrud adipisicing quis qui eu veniam ullamco
          qui. Mollit ipsum velit eiusmod esse sit eu qui ipsum magna ullamco
          quis. Reprehenderit aliqua nostrud sit commodo nostrud nostrud aliqua.
          Labore qui irure voluptate labore consectetur. Esse consequat fugiat
          amet amet laboris consequat sunt. Labore eiusmod aliqua ea ea minim.
          Incididunt esse deserunt aliqua eu. Enim aliqua ut magna ad irure est
          cupidatat. Exercitation sit nostrud eiusmod elit voluptate ut eu
          eiusmod ut dolore dolore magna eiusmod. Aliquip consectetur dolore ea
          magna eu anim nostrud aute consectetur nulla exercitation occaecat
          veniam cupidatat. Aliquip adipisicing irure pariatur laboris.
          Reprehenderit est qui ipsum minim dolor officia ea consequat deserunt
          duis ipsum sunt nulla. Sint ea sint elit Lorem consectetur cillum in
          ad consectetur ullamco dolore. Proident dolore sunt non non excepteur
          ut amet. Pariatur dolore cupidatat enim exercitation. Reprehenderit id
          irure veniam ut laboris adipisicing incididunt id consectetur
          voluptate enim mollit. Sint dolore elit velit et commodo incididunt ad
          anim cupidatat Lorem. Adipisicing quis duis dolor consequat proident
          qui tempor nostrud. Ut reprehenderit exercitation do et exercitation
          sint dolor proident id adipisicing exercitation.
        </p>
      </motion.div>
      <ChatInput />
    </div>
  );
};

export default Chat;
