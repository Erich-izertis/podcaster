import {useIsFetching} from "@tanstack/react-query";

export default function Header(): JSX.Element {
    const isFetching = useIsFetching()

    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className='font-semibold text-xl/[64px] text-blue-800'>
                <a href={process.env.NODE_ENV === 'production' ? "/podcaster/" : '/'}>Podcaster</a>
            </h1>
            {!!isFetching &&
                <svg className="animate-spin h-5 w-5 text-blue-800"
                     xmlns="http://www.w3.org/2000/svg"
                     data-testid="loading-spinner"
                     fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
            }
        </div>
    );
}