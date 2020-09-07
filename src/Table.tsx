import React from 'react';
import { AgGridReact } from 'ag-grid-react';
// import "bootstrap/dist/css/bootstrap.min.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './table.css';

interface Props {
    displayData: Array<Object>;
}

interface State {
    columnDefs: Array<Object>;
    rowData: Array<Object>;
}

export default class Counter extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Author", field: "author", width: 200
            }, {
                headerName: "Title", field: "title", width: 500
            }, {
                headerName: "Creation date", field: "date", width: 200
            }],
            rowData: []
        }
    }

    render() {
        const gridoptions = {
            defaultColDef: {
                resizable: true,
                cellStyle: {
                    'font-size': '10px'
                }
            },
            onRowClicked: function(event: any) { 
                // console.log('A row was clicked'); 
                // console.log("event", event["data"]["author"]);
                alert(`Title:\n${event["data"]["title"]} \nLink:\n${event["data"]["link"]} \nBody:\n${event["data"]["body"]}`);
            },
            headerHeight: 35
        }
        return(
                <div className="ag-theme-alpine tableClass">
                    <AgGridReact
                        gridOptions = {gridoptions}
                        columnDefs={this.state.columnDefs}
                        rowData={this.props.displayData}>
                    </AgGridReact>
                </div>
        );
    }

}