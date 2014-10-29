edgeDrag
========

A simple application of user interacting with object(node) representation and connection of the objects. Nodes can be dragged by clicking the "Switch Control" button. 
This application purposely uses pure javascript and HTML5 canvas without any external graphing libraries. 


Each node is an iframe that contains the entire "iframe.html". 

Available Interactions:
Create connection/edges from node to node
  -Cannot created an undirected edge, meaning edges can only be from one direction to the other indicated by the arrows
Delete edges by swiping(drag) above an edge
Dragging Nodes
  -Nodes can be dragged by clicking the switch control button, which switches the control over to manipulating the nodes

