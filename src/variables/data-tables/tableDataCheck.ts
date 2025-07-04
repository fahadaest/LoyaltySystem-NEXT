type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
  info: boolean;
};

const tableDataCheck: RowObj[] = [
  {
    name: ['John Doe', true],
    quantity: 2458,
    progress: '17.5%',
    date: '12 Jan 2021',
    info: false,
  },
  {
    name: ['Jane Smith', true],
    quantity: 1485,
    progress: '10.8%',
    date: '21 Feb 2021',
    info: true,
  },
  {
    name: ['Michael Johnson', true],
    quantity: 1024,
    progress: '21.3%',
    date: '13 Mar 2021',
    info: true,
  },
  {
    name: ['Emily Davis', true],
    quantity: 858,
    progress: '31.5%',
    date: '24 Jan 2021',
    info: true,
  },
  {
    name: ['Chris Williams', true],
    quantity: 258,
    progress: '12.2%',
    date: '24 Oct 2022',
    info: false,
  },
  {
    name: ['Sophia Brown', true],
    quantity: 1485,
    progress: '10.8%',
    date: '21 Feb 2021',
    info: true,
  },
  {
    name: ['Liam Garcia', true],
    quantity: 1024,
    progress: '21.3%',
    date: '13 Mar 2021',
    info: true,
  },
  {
    name: ['Olivia Martinez', true],
    quantity: 858,
    progress: '31.5%',
    date: '24 Jan 2021',
    info: true,
  },
  {
    name: ['Noah Anderson', true],
    quantity: 1485,
    progress: '10.8%',
    date: '21 Feb 2021',
    info: true,
  },
  {
    name: ['Ava Thomas', true],
    quantity: 1024,
    progress: '21.3%',
    date: '13 Mar 2021',
    info: true,
  },
  {
    name: ['James Moore', true],
    quantity: 858,
    progress: '31.5%',
    date: '24 Jan 2021',
    info: true,
  },
];

export default tableDataCheck;
