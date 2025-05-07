function onDislikeClick(event) {
    const dislikeModal = document.querySelector("#dislike-modal");
    dislikeModal.classList.remove("hidden");
    document.body.classList.add("no-scroll");
    dislikeModal.style.top = window.pageYOffset + "px";
  }
  
  function onUndoClick() {
    const dislikeModal = document.querySelector("#dislike-modal");
    dislikeModal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
  
  function onDoneClick() {
    onUndoClick();
    const dislikeImage = document.querySelector("#dislike-image");
  }
  
  const dislikeList = document.querySelectorAll("#dislike");
  
  for (let dislike of dislikeList) {
    dislike.addEventListener("click", onDislikeClick);
  }
  
  const undo = document.querySelector("#undo");
  undo.addEventListener("click", onUndoClick);
  
  const done = document.querySelector("#done");
  done.addEventListener("click", onDoneClick);
  
  
  function onJson2(json){
    console.log(json);
  
  const news_section = document.getElementById('news-section')
  const section_title = document.createElement('h2');
  news_section.appendChild(section_title);
  section_title.innerText = "News by NY Times";
  
  for(let i = 0; i < 3; i++){
      const side_card = document.createElement('div');
      side_card.classList.add('side-card');
      news_section.appendChild(side_card);
  
  
      const side_author_section = document.createElement('div');
      side_author_section.classList.add('side-author');
      side_card.appendChild(side_author_section);
  
      
      const ny_times_logo = document.createElement('img');
       ny_times_logo.src = "https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png";
       side_author_section.appendChild(ny_times_logo);
   
  
     const by_line = document.createElement('div');
    by_line.textContent = json.results[i].byline;
     side_author_section.appendChild(by_line);
      
  
      const news_headline = document.createElement('h3');
      news_headline.textContent = json.results[i].title;
      side_card.appendChild(news_headline);
    
  
      const news_date = document.createElement('div');
      news_date.classList.add('date');
      const unformatted_date = json.results[i].published_date;
      const formatted_date = writeDate(unformatted_date);
      news_date.textContent = formatted_date;
      side_card.appendChild(news_date);
  
    }
    
    function writeDate(date){
      const month_number = date.substring(5,6);
      const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      
      const month = months[month_number];
      const news_date = 'published on ' + month; 
      
      return news_date;
    }
  
  }
  
    function onResponse(response) {
    return response.json();
    }
  
  function onLoad1(){
    //leggo valore del titolo della card
    const cards = document.querySelectorAll('.card');
    
    const API_KEY_1 = 'S5kgE9gNeRiNpjebnTjSF3bNG2QqvsjHyq89L-frQno';
    
    for(let i = 0; i < cards.length; i++){
      const card = cards[i];
      
      const title = card.querySelector('.card-title')
    
      const title_text = encodeURIComponent(title.textContent);
   
      const rest_url_1 = 'https://api.unsplash.com/photos/random?query='+title_text+'&orientation=landscape'+'&client_id='+API_KEY_1;
      
      function onJson1(json){
      //console.log("json1 ricevuto"); 
       
      const image_space = card.querySelector('.image-space');
      const image = document.createElement('img');
      image.src = json.urls.small; 
      image_space.appendChild(image); 
        
      }
      
      fetch(rest_url_1).then(onResponse).then(onJson1);
    }
  } 
  
  function onLoad2(response){
     //Preparo la richiesta
   const API_KEY_2 = 'yzFAiL1uq5bJze9tBWcd4n7JrctGgQCQ';
   const rest_url_2 = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key='+API_KEY_2;
    
   console.log(rest_url_2);
    
  fetch(rest_url_2).then(onResponse).then(onJson2);
  }
  
  onLoad1();
  
  onLoad2();
  