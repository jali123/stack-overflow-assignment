import React from 'react';
import Table from './Table';

interface Props {
}

interface State {
    data: Array<Object>;
    tableData: Array<Object>;
};

export default class Counter extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            tableData: []
        }
    }

    componentDidMount() {
        this.fetchTableData();
    }

    fetchTableData = () => {
        fetch (
            'https://api.stackexchange.com/2.1/questions?pagesize=100&tagged=react&site=stackoverflow&filter=withbody'
            )
        .then (function (response) {
            if (response.ok) { 
                return response.json(); 
            }
        })
        .then (
            rJsn => {
                // console.log ("rJsn",rJsn);
                // console.log("author", rJsn["items"][0]["owner"]["display_name"]);  
                // console.log("title", rJsn["items"][0]["title"]);  
                // console.log("date", rJsn["items"][0]["creation_date"]);  
                this.setState({
                    data: rJsn["items"]
                },
                () => {
                    this.formatTableData(this.state.data);
                });
            }
        );
    }

    formatTableData = (resData: any) => {
        const dataAfterFormatting: Array<Object> = [];
        for(let i=0; i<resData.length; i++) {
            const singleObj: any = {};
            singleObj["author"] = resData[i]["owner"]["display_name"];
            singleObj["title"] = resData[i]["title"];
            singleObj["date"] = resData[i]["creation_date"];
            singleObj["body"] = resData[i]["body"];
            singleObj["link"] = resData[i]["link"];
            dataAfterFormatting.push(singleObj);
        }
        this.setState({
            tableData: dataAfterFormatting
        });
    }

    render() {
        // console.log("this.state.tableData", this.state.tableData);
        return(
            <div>
                <Table displayData={this.state.tableData} />
            </div>
        );
    }

}