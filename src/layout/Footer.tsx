export default function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <p className='text-center'>
            <a href="/">Podcaster</a>
            <span className='mx-1'>© {currentYear}</span>
        </p>
    );
}