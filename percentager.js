
function addControls(){
	let percdiv = document.createElement("div");
	let percstartcap = document.createElement("input");
	let percexecbutton = document.createElement("button");
	let perclabel = document.createElement("label");
	let emptyline = document.createElement("p");
	let dollarsign = document.createElement("span");

	//percdiv.appendChild(perclabel);
	percdiv.appendChild(dollarsign);
	percdiv.appendChild(percstartcap);
	percdiv.appendChild(percexecbutton);
	percdiv.appendChild(emptyline);


	//perclabel.innerHTML = "Starting Capital: ";
	dollarsign.innerHTML = "$";
	percstartcap.id = "startcap";
	percexecbutton.innerHTML = "Percentager!";
	percexecbutton.className = "btn";
	percstartcap.className = "input";
	percstartcap.placeholder = "Starting Capital...";
	percstartcap.value = 800;


	//percexecbutton.onclick = changeOverviewData;
	dollarsign.style.setProperty("font-size","x-large", "important");
	dollarsign.style.setProperty("vertical-align","middle", "important");
	dollarsign.style.setProperty("margin","10px", "important");
	dollarsign.style.setProperty("color","darkorange", "important");

	percexecbutton.onclick = changeDetailedData;

	percexecbutton.style.setProperty("color","green", "important");
	percexecbutton.style.setProperty("font-weight","800", "important");
	percexecbutton.style.setProperty("font-size","1rem", "important");

	percstartcap.style.setProperty("font-size","x-large", "important");
	percstartcap.style.setProperty("font-weight","bolder", "important");
	percstartcap.style.setProperty("background-color","darkorange", "important");
	percstartcap.style.setProperty("border-radius","8px","important");


	percdiv.style.setProperty("background-color","#774444", "important");
	percdiv.style.setProperty("text-align","center","important");
	percdiv.style.setProperty("border-radius","12px","important");
	percdiv.style.setProperty("padding","0.3rem","important");
	percdiv.style.setProperty("margin-bottom","8px","important");
	percdiv.style.setProperty("text-align-last","center","important");
	percdiv.style.setProperty("padding-top","1rem","important");

	percexecbutton.style.setProperty("margin-left","20px","important");

	let tabs = document.getElementById("report-tabs");
	tabs.insertAdjacentElement("beforebegin",percdiv);

	//console.log(document.URL);

}

function changeOverviewData(){

	let plday = document.querySelector("#chart_recent_pl_by_day");
	let cumpl = document.querySelector("#chart_recent_cumulative_pl_by_day");
	let calpl = document.querySelector("#cal_month_detail");

	let inRecent = document.querySelector("#sub-recent").className == "btn active";
	let inCal = document.querySelector("#sub-cal").className == "btn active";

	let pls = [];
	let cumpls = [];
	let calpls = [];
	if (inRecent==true){
		pls = plday.querySelectorAll("g > text");
		cumpls = cumpl.querySelectorAll("g > text");
	}
	if (inCal==true){
		calpls = calpl.querySelectorAll(".pl_details > a");
	}

	let allelements = [...pls,...cumpls,...calpls];

	let startcap = document.querySelector("#startcap");

	const reg = /[$].*/;
	let currpl = 0;
	let calotherinfo = "";

	for (let elem of allelements){
		//console.log(elem.innerHTML);
		if(reg.test(elem.innerHTML)==true){
			//console.log(Number( elem.innerHTML.replace(/[$]/g,'') ));
			if( inRecent==true){
				currpl = Number( elem.innerHTML.replace(/[$]/g,'') );
			}
			if( inCal==true){
				currpl = Number( elem.innerHTML.split("<br>",1)[0].replace(/[$]/g,'') );
				calotherinfo = "<br>"+elem.innerHTML.split("<br>",2)[1];
			}
			
			let growth = currpl / Number(startcap.value);
			//console.log("matched "+elem.innerHTML);
			elem.innerHTML = (growth*100).toFixed(2) + "%" + calotherinfo;
		}
	}
}

function changeDetailedData(){

	let curr_url = document.URL;

	let inCal = curr_url.includes("overview");
	let inDetailed = curr_url.includes("detailed") || curr_url.includes("winloss");

	let allelements = [];

	if(inCal==true){
		allelements = document.querySelectorAll("g > text, .pl_details > a");
	}else if(inDetailed==true){
		allelements = document.querySelectorAll("g > text, td");
	}

	let startcap = document.querySelector("#startcap");

	const reg = /[$].*/;
	const rangereg = /[$].*[-].*[$].*/;

	let currpl = 0;
	let otherinfo = "";
	let original = "";

	
	for (let elem of allelements){
		if(reg.test(elem.innerHTML)==true){

			if(rangereg.test(elem.innerHTML)==true){continue;}

			if(inCal==true){	
				original = elem.innerHTML.split("<br>",1)[0];
				//console.log( Number(original.replace(/[$,]/g,'')));
				currpl = Number( original.replace(/[$,]/g,'') );

				otherinfo = "<br>"+elem.innerHTML.split("<br>",2)[1];

			}else if(inDetailed==true){
				original = elem.innerHTML.split(" ",1)[0];
				currpl = Number( elem.innerHTML.replace(/[$,]/g,'').split(" ",1)[0] );

				otherinfo = elem.innerHTML.replace(/[$,]/g,'').split(" ",2)[1];
			}


			let growth = currpl / Number(startcap.value);
			elem.innerHTML = elem.innerHTML.replace(original, "["+(growth*100).toFixed(2) + "%]");
			elem.style.setProperty("font-weight","bold","important");
			//console.log(elem.innerHTML.split(" ",1)[0]);
		}
	}

	// in caclendar mode, change tile colours.
	if(inCal==true){
		allelements = document.querySelectorAll("td.loss");

		for (let elem of allelements){
			elem.style.setProperty("background-color","#ff567c", "important");
		}

		allelements = document.querySelectorAll("td.win");

		for (let elem of allelements){
			elem.style.backgroundColor = "#4da3ff";
		}	
	}



}

setTimeout(addControls, 100);

// [$]-*\d+