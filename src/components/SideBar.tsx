import { FC, useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/sidebar.scss';
import { Button } from './Button';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface IPropsSidebar {
  onClick(id: number): void;
  selectedGenreId: number;
}

export const SideBar: FC<IPropsSidebar> = ({
  onClick: handleClick,
  selectedGenreId,
}) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={`${genre.id}`}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};
