import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

export const format_price  = (price) => {
    let str_price = price.toString(10);
    return [str_price.slice(0, str_price.length -2), '.', str_price.slice(str_price.length -2), '€'].join('');
}

render(
    <App />,
    document.getElementById('app')
);