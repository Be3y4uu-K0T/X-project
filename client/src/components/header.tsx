import { gql } from '../__generated__/gql';
import React from 'react';

export default function Header() {
  return (
    <header data-box>
      <span className='logo'>X-Project</span>
      <ul className='navigation'>
        <li data-text-link>Главная</li>
        <li data-text-link>О проекте</li>
        <li data-text-link>Партнеры</li>
        <li data-text-link>Контакты</li>
        <li>
          <button data-button data-button-link>
            <div>
              Попробовать
            </div>
          </button>
        </li>
      </ul>
    </header>
  );
};
