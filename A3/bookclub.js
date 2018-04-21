function newRequest() {

	var title = document.getElementById("title").value;
	title = title.trim();
	title = title.replace(" ","+");

	var author = document.getElementById("author").value;
	author = author.trim();
	author = author.replace(" ","+");

	var isbn = document.getElementById("isbn").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");


	var query = ["",title,author,isbn].reduce(fancyJoin);

	

	if (query != "") {

		document.body.style.backgroundColor = "#ededed";
		document.getElementById("search-heading").style.display = "none";
		document.getElementById("header").style.boxShadow = "0px 0px 5px 2px #ababab";
		document.getElementById("header").style.flexDirection = "row";
		document.getElementById("search").style.marginTop = "0";
		document.getElementById("search").style.flexDirection = "row";
		document.getElementById("search-btn").style.margin = "0";
		document.getElementById("search-btn").style.marginTop = "34px";
		document.getElementById("search-btn").style.width = "200px";
		document.getElementById("or-1").style.display = "none";
		document.getElementById("or-2").style.display = "none";
		document.getElementById("header").style.paddingTop = "20px";
		document.getElementById("search-inputs").style.paddingRight = "5px";
		var blocks = document.getElementsByClassName("search-block");
		blocks[0].style.width = "auto";
		blocks[1].style.width = "auto";
		blocks[2].style.width = "auto";

		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback
		script.id = "jsonpCall";

		

		// put new script into DOM at bottom of body
		document.body.appendChild(script);	
	}
}

function fancyJoin(a,b) {
    if (a == "") { return b; }	
    else if (b == "") { return a; }
    else { return a+"+"+b; }
}

function handleResponse(bookListObj) {

	var bookList = bookListObj.items;

	var bookDisplay = document.getElementById("bookDisplay");

	for (i=0; i<bookList.length; i++) {
		var block = document.createElement("div");
		block.id = "book-" + i;
		block.className = "book-info-block";

		var book = bookList[i];

		

		var image = document.createElement("img");
		image.src = book.volumeInfo.imageLinks.thumbnail;

		
		var title = document.createElement("p");
		var author = document.createElement("p");
		var intro = document.createElement("p");
		author.textContent = "by " + book.volumeInfo.authors;
		/* ALWAYS AVOID using the innerHTML property */
		title.textContent = book.volumeInfo.title;
		block.appendChild(image);

		//intro.textContent = book.volumeInfo.description;
		intro.textContent = thirty_words(book.volumeInfo.description);

		var text = document.createElement("div");
		text.className = "book-info-text";

		var close = document.createElement("button");
		close.className = "close-btn";
		close.textContent = "X";
		close.onclick = "close_tile()";

		text.appendChild(close)
		text.appendChild(title);
		text.appendChild(author);
		text.appendChild(intro);

		block.appendChild(text);
		bookDisplay.appendChild(block);
	}

}

function thirty_words(str) {
	var count = 0;
	var i = 0;
	for (i=0; i<str.length; i++) {
		if (str[i] == ' ') {
			count++;
			
		}
		if (count > 10) {
			break;
		}
	}
	if(count > 10) {
		str.substring(0,i);
		return str.substring(0,i) + "...";
	}
	else {
		return str;
	}
}