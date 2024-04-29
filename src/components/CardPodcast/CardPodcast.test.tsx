import { render, screen } from '@testing-library/react';

import CardPodcast from './CardPodcast';

describe('CardPodcast', () => {
  const props = {
    title: 'Podcast Title',
    imgSrc: 'http://example.com/podcast.jpg',
    artist: 'Podcast Artist'
  };

  it('renders the podcast information correctly', () => {
    render(<CardPodcast {...props} />);

    // Check if the image is rendered with correct src and alt attributes
    const image = screen.getByRole('img', { name: props.title });
    // expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.imgSrc);
    // expect(image).toHaveAttribute('alt', props.title);
    //
    // // Check if the title and artist are rendered correctly
    // expect(screen.getByText(props.title, { selector: 'b' })).toBeInTheDocument();
    // expect(screen.getByText(`Autor: ${props.artist}`)).toBeInTheDocument();
  });

  // it('applies correct styles to elements', () => {
  //   render(<CardPodcast {...props} />);
  //   const image = screen.getByRole('img', { name: props.title });
  //
  //   // Check specific style rules applied to the image
  //   expect(image).toHaveClass('mx-auto rounded-full mb-2 -mt-20 w-36 h-36');
  //
  //   // Check text alignment
  //   const text = screen.getByText(props.title, { selector: 'b' }).parentElement;
  //   expect(text).toHaveClass('text-center');
  // });
  //
  // it('should be hoverable', () => {
  //   render(<CardPodcast {...props} />);
  //   const card = screen.getByRole('article'); // Assuming the card is rendered as an article
  //
  //   // Check if the card has the hoverable class
  //   expect(card).toHaveClass('hoverable');
  // });
});
