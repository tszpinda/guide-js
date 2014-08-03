 
function startIntro(){
	var intro = introJs();
   intro.setOptions({
   	steps: [
              { 
                intro: "Hello world!"
              },
              {
                element: document.querySelector('#email'),
                intro: "This is a tooltip."
              },
              {
                element: document.querySelector('[data-tooltip]'),
                intro: "Enter the email address used when you created your account."
              },
              {
                element: document.querySelectorAll('#step2')[0],
                intro: "Ok, wasn't that fun?",
                position: 'right'
              },
              {
                element: '#step3',
                intro: 'More features, more fun.',
                position: 'left'
              },
              {
                element: '#step4',
                intro: "Another step.",
                position: 'bottom'
              },
              {
                element: '#step5',
                intro: 'Get it, use it.'
              }
      ]
	});
   intro.start();
}
console.log('starting intro');
startIntro();
