import { useState } from 'react';

interface AudioPlayerProps {
  url: string;
}

export default function AudioPlayer({ url }: AudioPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className='relative'>
      {isLoading && (
        <div role="progressbar" className='absolute inset-0 flex items-center z-10'>
          <div className='h-1 bg-gray-200 w-full'>
            <div className='h-full bg-blue-400 animate-pulse'/>
          </div>
        </div>
      )}
      <audio
        role="audio"
        controls
        className={`w-full ${isLoading ? 'opacity-50' : ''}`}
        onLoadedData={handleLoadedData} >
        <source src={url} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}
