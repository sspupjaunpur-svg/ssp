"use client";
import { useRef, useState, type ReactNode } from "react";

export default function VideoModal({ src, youtube, title, children, className = "" }: { src?: string; youtube?: string; title: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const show = () => { setOpen(true); ref.current?.showModal(); };
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" onClick={show} aria-label={`Play video: ${title}`} className={className}>{children}</button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto bg-transparent p-0"
      >
        <div className="relative aspect-video w-[min(92vw,960px)] overflow-hidden rounded-2xl bg-black shadow-2xl">
          {open && (youtube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video src={src} controls autoPlay playsInline className="h-full w-full" />
          ))}
        </div>
        <button type="button" onClick={close} aria-label="Close video" className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white text-xl font-bold text-maroon shadow-lg hover:bg-saffron">×</button>
      </dialog>
    </>
  );
}
