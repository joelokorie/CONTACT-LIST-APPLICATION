
	var quickAddBtn          = document.getElementById("QuickAdd");
	var AddBtn               = document.getElementById("Add");
	var cancelBtn            = document.getElementById("Cancel");
	var  quickAddFormDiv     = document.querySelector(".quickaddForm");
	var  editFormDiv     	 = document.querySelector(".editForm");

	var fullname = document.getElementById("fullname");
	var phone    = document.getElementById("phone");
	var address  = document.getElementById("address");
	var city     = document.getElementById("city");
	var email    = document.getElementById("email");

	var addBookDiv = document.querySelector(".addbook");

	var addressBook = [];

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
		editFormDiv.style.display = "none";

	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);
	
	function jsonStructure(fullname, phone, address, city, email){
		this.fullname = fullname;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.email = email;
	}
	// Add into the address book function
	function addToBook(){

		if (fullname.value!=="" && phone.value!=="" && address.value!=="" && city.value!=="" && email.value!=="") 
		{
			var newObj = new jsonStructure(fullname.value,  phone.value,  address.value, city.value, email.value) ;
			addressBook.push(newObj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";


			showAddressBook();

			clearForm();
		} 
	}

	// Remove and Edit function
	function removeEntry(e){

		if(e.target.classList.contains("delbutton")){
			var affirm = confirm("Delete contact?");
			if(affirm){

			var remID =e.target.getAttribute("value");
			remID = remID - 1;

			addressBook.splice(remID, 1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
			}
		}else if(e.target.classList.contains("edtbutton")){
			var remID =e.target.getAttribute("value");
			remID = remID - 1;

			var edtID = e.target.getAttribute("data.id");
			editFormDiv.style.display = "block";
			quickAddFormDiv.style.display = "none";


			var AddEdt   	 = document.getElementById("addEdt");
			var cancelEdt    = document.getElementById("cancelEdt");

			var edtname     = document.getElementById("edtName");
			var edtphone    = document.getElementById("edtPhone");
			var edtaddress  = document.getElementById("edtAddress");
			var edtcity     = document.getElementById("edtCity");
			var edtemail    = document.getElementById("edtEmail");

			edtname.value  =  addressBook[remID].fullname;
			edtphone.value  =	addressBook[remID].phone;
			edtaddress.value= addressBook[remID].address;
			edtcity.value  = addressBook[remID].city;
			edtemail.value  = addressBook[remID].email;

			

			function jsonStructure(fullname, phone, address, city, email){
				this.fullname = fullname;
				this.phone = phone;
				this.address = address;
				this.city = city;
				this.email = email;
			}

			function addToBook(){

				edtname = edtname.value;
				fullname = edtname.trim();

				edtphone = edtphone.value;
				phone = edtphone.trim();

				edtaddress = edtaddress.value;
				address = edtaddress.trim();

				edtcity = edtcity.value;
				city = edtcity.trim();

				edtemail = edtemail.value;
				email = edtemail.trim();


				if (fullname=="" || phone=="" || address=="" || city=="" || email =="") 
				{
					var error = document.getElementById("editErr");
						error.innerHTML = "*Some input spaces are empty*"
				}
				else{

					var edtObj = new jsonStructure(fullname,  phone,  address, city, email);
					addressBook.splice(remID, 1, edtObj);
					// addressBook.push();


					localStorage['addbook'] = JSON.stringify(addressBook);
					editFormDiv.style.display = "none";
					
					function clearEdtForm()
					{

							edtname = "";
						   edtphone = "";
						 edtaddress = "";
						    edtcity = "";
						   edtemail = "";						
					}

					showAddressBook();

				} 
			}

			cancelEdt.addEventListener("click", function(){

				editFormDiv.style.display = "none";

			});

			AddEdt.addEventListener("click", addToBook);
			
		}

	}

	

	function clearForm(){

		var fullname = document.getElementById("fullname");
		var phone    = document.getElementById("phone");
		var address  = document.getElementById("address");
		var city     = document.getElementById("city");
		var email    = document.getElementById("email");

		fullname.value = "";
		   phone.value = "";
		 address.value = "";
		    city.value = "";
		   email.value = "";
		
	}
	function showAddressBook(){

		if(localStorage['addbook'] === undefined){

			localStorage['addbook'] = "[]";
		}else
		{
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '<span class="header"><span class="head">ID</span><span class="head">Name</span><span class="head">Email</span><span class="head">Phone</span><span class="head">Address</span><span class="head">City</span><span class="head">Actions</span></span>';
			for(var n in addressBook){
				var no = Number(n)+1;
				var str = '<div class="entry">';
					str += '<span class="spa name" id="no">' + no + '</span>';
					str += '<span class="spa name">' + addressBook[n].fullname + '</span>';
					str += '<span class="spa email">' + addressBook[n].email + '</span>';
					str += '<span class="spa phone">' + addressBook[n].phone + '</span>';
					str += '<span class="spa address">' + addressBook[n].address + '</span>';
					str += '<span class="spa city">'+ addressBook[n].city + '</span>';
					str += '<span class="del"><button href="#" id="no" value="'+no+'"class="delbutton">Delete</button></span>';
					str += '<span class="edt"><button href="#" id="no" value="'+no+'"class="edtbutton">Edit</button></span>';
					str += '</div>';

					addBookDiv.innerHTML += str;
			}
		}
	}
	showAddressBook();
