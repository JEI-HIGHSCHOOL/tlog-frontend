import Link from 'next/link';
import * as React from 'react';

const Card: React.FC<CardProps> = ({
  background,
  badgeBackground,
  badgeMessage,
  message,
  submessage,
  image,
  href,
}) => {
  return (
    <Link href={href}>
      <div className='main-card-banner' style={{ background: background }}>
        <div
          className='main-card-banner-badge'
          style={{ background: badgeBackground }}
        >
          {badgeMessage}
        </div>
        <div className='main-card-banner-message'>{message}</div>
        <div className='main-card-submessage'>{submessage}</div>
        {image}
      </div>
    </Link>
  );
};

interface CardProps {
  background: string;
  badgeBackground: string;
  badgeMessage: string;
  message: React.ReactNode;
  submessage: string;
  image: React.ReactNode;
  href: string;
}

export default Card;
