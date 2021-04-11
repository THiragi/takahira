import React from 'react';

import { parseISO, format } from 'date-fns';

const Date = ({ dateString }: { dateString: string }): JSX.Element => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, 'yyyy.LL.dd')}</time>;
};

export default Date;
