import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AndroidEmulator({ imageId }: { imageId?: string }) {
  const image = PlaceHolderImages.find((img) => img.id === imageId);

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
      <div className="w-[120px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[40px] w-[3px] bg-gray-800 absolute -left-[13px] top-[60px] rounded-l-lg"></div>
      <div className="h-[40px] w-[3px] bg-gray-800 absolute -left-[13px] top-[120px] rounded-l-lg"></div>
      <div className="h-[60px] w-[3px] bg-gray-800 absolute -right-[13px] top-[100px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background">
        {image && (
          <Image
            src={image.imageUrl}
            alt={image.description}
            width={270}
            height={550}
            data-ai-hint={image.imageHint}
            className="object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
