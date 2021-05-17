import React from 'react';

import { parseISO, format } from 'date-fns';

type Props = {
  dateString: string;
  dateFormat: string;
};

const Date: React.VFC<Props> = ({ dateString, dateFormat }) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, dateFormat)}</time>;
};

export default Date;
