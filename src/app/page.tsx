"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';
import { AgGridReact } from 'ag-grid-react';
import { Pie } from 'react-chartjs-2';
import CircularGraph from '@/components/ui/CircularGraph';


const allowedExtensions = ['csv'];

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [totals, setTotals] = useState<Record<string, number>>({});



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setLoading(true);
    const inputFile = e.target.files?.[0];

    if (inputFile) {
      const fileExtension = inputFile.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file');
        setLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target?.result as string, { header: true });
        const parsedData = csv?.data as Record<string, string>[];

        setData(parsedData);
        setTotals(calculateTotals(parsedData));

        setLoading(false);
      };
      reader.readAsText(inputFile);
    } else {
      setLoading(false);
    }
  };

  const calculateTotals = (data: Record<string, string>[]) => {
    const totals: Record<string, number> = {};
    data.forEach(row => {
      Object.keys(row).forEach(key => {
        totals[key] = (totals[key] || 0) + (parseFloat(row[key]) || 0);
      });
    });
    return totals;
  };

  const pinnedBottomRowData = [
    {
      ...totals,
      "Department": "Total",
    },
  ];



  const colDefs: any = [
    {
      field: 'Department',
      headerName: 'Department',
      flex: 1,
      sortable: true,
      cellRenderer: (params: { data: any }) => {
        const createdAt = params?.data.Department;
        return <p className='text-blue-600 underline'>{createdAt}</p>;
      },
      pinnedRowCellRenderer: () => <p className='font-bold'>Total</p>

    },
    {
      field: 'Consented',
      headerName: 'Consented',
      flex: 1,
      sortable: true,
    },

    {
      field: 'In Progress',
      headerName: 'In Progress',
      flex: 1,
      sortable: true,
    },
    {
      field: 'Initiated',
      headerName: 'Initiated',
      flex: 1,
      sortable: true,
    },
    {
      field: 'Not Delivered',
      headerName: 'Not Delivered',
      flex: 1,
      sortable: true,
    },
    {
      field: 'Rejected',
      headerName: 'Rejected',
      flex: 1,
      sortable: true,
    }
  ];

  return (
    <div className='container mx-auto'>
      <div className='py-10'>
        <div className='container'>
          {data.length > 0 ? (
            <div className="">
              <div className="mt-10 w-full h-full">
                <div className="ag-theme-quartz h-[500px] pb-4">

                  <AgGridReact
                    className="w-full"
                    rowData={data}
                    columnDefs={colDefs}
                    pagination={true}
                    pinnedBottomRowData={pinnedBottomRowData}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50, 100, 500, 1000]}
                  />
                </div>
              </div>
              <CircularGraph data={data} />
            </div>
          ) : (
            <div className="">
              {error && <p className='text-red-600'>{error}</p>}
              <p>Please upload a CSV file.</p>
              <label htmlFor='csvInput' style={{ display: 'block' }}>
                Enter CSV File
              </label>
              <input
                onChange={handleFileChange}
                id='csvInput'
                name='file'
                type='file'
                accept='.csv'
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Home;
