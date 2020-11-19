var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();
const graphqlResolver = require('./graphqlResolver');
const graphqlSchema = require('./graphqlSchema');
const user = require('./user.js')
const xlsx = require('xlsx');
const { jsPDF } = require("jspdf")
const table = require('jspdf-autotable');



app.use(express.static(__dirname+'view'))


app.set('view engine', 'ejs');




mongoose.connect('mongodb://127.0.0.1/apicollegepanel',{useNewParser:true,useUnifiedTopology:true},(err,data)=>{
	console.log('mongodb connected');
});

app.get('/',async(req,res)=>{
	const file = await xlsx.readFile('./Financial Sample1.xlsx');
	console.log(file.SheetNames)
	const sheelistlist = file.SheetNames.map((sheet,i)=>{
		console.log('sss',sheet);
		const data = xlsx.utils.sheet_to_json(file.Sheets[sheet]);
		res.render(__dirname+'/view/sample',{
			data : data
		})
})

})


//excel file

// app.get('/',async(req,res)=>{
// 	const file = await xlsx.readFile('./Financial Sample1.xlsx');
// 	console.log(file.SheetNames)
// 	const sheelistlist = file.SheetNames.map((sheet,i)=>{
// 		console.log('sss',sheet);
// 		const data = xlsx.utils.sheet_to_json(file.Sheets[sheet]);
// 		 const doc = new jsPDF();
// 		  const tablecolumn = [];
// 		  tablecolumn.push('segment');
// 		  const tablerow = [];
// 		 data.map((data,i)=>{
// 		 	 tablerow.push(data.Segment)
// 		 })
// 		  doc.autoTable(tablecolumn,tablerow);
//     	doc.save('report11.pdf')
// 		res.render(__dirname+'/view/sample',{
// 			data : data
// 		})
// 		// res.json({
// 		// 	data : doc
// 		// })
// 	})
// 	// const data = xlsx.utils.sheet_to_json(file.Sheets['Sheet1'])
	
// })


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(cors())


// app.use('/graphql', graphqlHTTP({
//   schema: graphqlSchema,
//   rootValue: graphqlResolver,
//   graphiql: true,
// }));
app.listen(4000);
