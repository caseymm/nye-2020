const d3 = require("d3");
const _ = require('underscore');

const displayFeedback = () => {
  console.log('feedback 2');
}

const submitForm = (name, plus1) => {
  d3.queue()
    .defer(d3.json, `https://docs.google.com/forms/d/e/1FAIpQLScqkPreA455XuHFH292O2p0HYnXoyoTxgaYSPNcxOpABVCIyQ/formResponse?entry.1222133421=${encodeURI(name)}&entry.1234530643=${encodeURI(plus1)}`)
    .await(displayFeedback);
  d3.select('#submitRSVP').style('display', 'none');
  d3.select('#submitted').style('display', 'block');
}

d3.select('#submitRSVP').on('submit', d => {
  d3.event.preventDefault();
  const name = d3.select('#name').property('value');
  const plus1 = d3.select('#plus1').property('value');
  submitForm(name, plus1);
});

d3.selectAll('input.acting').on('focus', (d, i, nodes) => {
  if(d3.select(nodes[i]).property('value').length > 0){
    d3.select(nodes[i].parentNode).classed('show-ex', true);
  }
});

d3.selectAll('input.acting').on('keyup', (d, i, nodes) => {
  if(d3.select(nodes[i]).property('value').length > 0){
    d3.select(nodes[i].parentNode).classed('show-ex', true);
  } else {
    d3.select(nodes[i].parentNode).classed('show-ex', false);
  }
});

d3.selectAll('.del').on('click', (d, i, nodes) => {
  d3.select(nodes[i].parentNode).select('input').property('value', '');
  d3.select(nodes[i].parentNode).select('input').node().focus();
  d3.select(nodes[i].parentNode).classed('show-ex', false);
});
