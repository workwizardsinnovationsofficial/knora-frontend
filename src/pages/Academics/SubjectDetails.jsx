import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayCircle, FileText, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import './SubjectDetails.css';

const unitsSample = [
  {
    unitNumber: 1,
    title: 'Linear Data Structures & Stacks/Queues',
    topics: [
      'Introduction to Data Structures & Abstract Data Types',
      'Arrays & Sparse Matrix Representation',
      'Singly and Doubly Linked List Operations',
      'Stack ADT Implementation using Array and Linked List',
      'Queue ADT & Circular Queue Applications'
    ]
  },
  {
    unitNumber: 2,
    title: 'Non-Linear Data Structures: Trees & Binary Search Trees',
    topics: [
      'Tree Terminology & Representation',
      'Binary Tree Traversals (Inorder, Preorder, Postorder)',
      'Binary Search Tree (BST) Insertion and Deletion',
      'AVL Trees & Height Balance Factor',
      'B-Trees and B+ Trees Indexing'
    ]
  },
  {
    unitNumber: 3,
    title: 'Graphs & Shortest Path Algorithms',
    topics: [
      'Graph Representations (Adjacency Matrix & List)',
      'Breadth First Search (BFS) & Depth First Search (DFS)',
      'Dijkstra Shortest Path Algorithm',
      'Minimum Spanning Trees (Prim and Kruskal)'
    ]
  }
];

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  return (
    <div className="subject-details-container">
      <div className="sub-header-card">
        <span className="sub-tag">CS301PC • JNTUH R22</span>
        <h1>Data Structures & Algorithms</h1>
        <p>Master linear and non-linear data structures with unit-wise faculty video lessons and downloadable PDF notes.</p>
      </div>

      <div className="units-list">
        {unitsSample.map((unit) => (
          <div key={unit.unitNumber} className="unit-card">
            <div className="unit-header">
              <h3>Unit {unit.unitNumber}: {unit.title}</h3>
              <span className="topic-count">{unit.topics.length} Topics</span>
            </div>

            <div className="topics-list">
              {unit.topics.map((topic, idx) => (
                <div 
                  key={idx} 
                  className="topic-item-row"
                  onClick={() => navigate(`/academics/subject/${subjectId || 'dsa'}/unit/${unit.unitNumber}/topic/${idx + 1}`)}
                >
                  <div className="topic-name">
                    <PlayCircle size={16} color="#007DFF" />
                    <span>Topic {idx + 1}: {topic}</span>
                  </div>
                  <ChevronRight size={16} color="#888888" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDetails;
