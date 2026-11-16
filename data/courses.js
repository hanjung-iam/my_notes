/* =========================================================
   課程與筆記的唯一資料登錄檔
   新增課程或筆記時，只要修改這個檔案（格式見 CLAUDE.md 第 4 節）
   ========================================================= */
window.NOTES_DATA = {
  courses: [
    {
      slug: "algorithms",
      name: "演算法",
      folder: "演算法",
      icon: "assets/icons/algorithms.png",
      color: "purple",
      description: "CS 4311 Introduction to Algorithms 講義整理",
      notes: [
        {
          file: "03-solving-recurrences.html",
          title: "遞迴式求解 (Solving Recurrences)",
          unit: "Lecture 03",
          summary: "用 Recursion Tree、Substitution、Master Theorem 三種方法求遞迴式的漸進解。",
          tags: ["遞迴式", "複雜度分析"],
          sources: ["Algo-Lecture-03.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "05-quicksort.html",
          title: "快速排序 (Quicksort)",
          unit: "Lecture 05",
          summary: "用 pivot 分割再遞迴排序；worst case Θ(n²)、平均 Θ(n log n)，以及 in-place partition。",
          tags: ["排序", "複雜度分析"],
          sources: ["Algo-Lecture-05.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "06-linear-time-sorting-and-lower-bound.html",
          title: "線性時間排序與比較排序的下界 (Linear-Time Sorting & Lower Bound)",
          unit: "Lecture 06–07",
          summary: "Counting、Radix、Bucket Sort 如何突破 n log n，以及用 decision tree 證明比較排序需要 Ω(n log n)。",
          tags: ["排序", "下界"],
          sources: ["Algo-Lecture-06.pdf", "Algo-Lecture-07.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "08-max-min-and-selection.html",
          title: "找最大最小值與第 k 小 (Max, Min & Selection)",
          unit: "Lecture 08",
          summary: "找 max 需 n−1 次、同時找 max/min 需 1.5n−2 次比較的上下界，以及 median of medians 線性時間選擇。",
          tags: ["下界", "選擇問題"],
          sources: ["Algo-Lecture-08.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "09-dynamic-programming-intro.html",
          title: "動態規劃入門 (Dynamic Programming)",
          unit: "Lecture 09",
          summary: "從 Fibonacci 看 DP 的核心：用表格存中間結果；以及 Assembly Line Scheduling 的遞迴式。",
          tags: ["動態規劃"],
          sources: ["Algo-Lecture-09.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "10-lcs-and-edit-distance.html",
          title: "最長共同子序列與編輯距離 (LCS & Edit Distance)",
          unit: "Lecture 10",
          summary: "LLCS 遞迴式與填表、backtracking 找出 LCS、節省空間的方法，以及 edit distance 問題。",
          tags: ["動態規劃", "字串"],
          sources: ["Algo-Lecture-10.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "11-vertex-cover.html",
          title: "頂點覆蓋 (Vertex Cover)",
          unit: "Lecture 11",
          summary: "在樹上用 Best 與 Best1 兩個值做 DP，線性時間求出最少守衛數。",
          tags: ["動態規劃", "圖論"],
          sources: ["Algo-Lecture-11.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "12-matrix-chain-and-optimal-bst.html",
          title: "矩陣鏈乘法與最佳二元搜尋樹 (Matrix Chain & Optimal BST)",
          unit: "Lecture 12",
          summary: "用 Best(i, j) 在 O(n³) 找出最少運算的相乘順序；Optimal BST 最小化 Σ fⱼlⱼ。",
          tags: ["動態規劃", "樹"],
          sources: ["Algo-Lecture-12.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "13-greedy-algorithms.html",
          title: "貪婪演算法 (Greedy Algorithms)",
          unit: "Lecture 13",
          summary: "Greedy choice 與 cut-and-paste 證明；活動選擇、Fractional Knapsack、樹的 Vertex Cover、Huffman Code。",
          tags: ["貪婪演算法", "圖論", "編碼"],
          sources: ["Algo-Lecture-13.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "14-amortized-analysis.html",
          title: "攤銷分析 (Amortized Analysis)",
          unit: "Lecture 14–15",
          summary: "Aggregate、Accounting、Potential 三種方法，以 Super Stack 與 Binary Counter 為例。",
          tags: ["攤銷分析", "複雜度分析"],
          sources: ["Algo-Lecture-14.pdf", "Algo-Lecture-15.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "16-dynamic-array.html",
          title: "動態陣列 (Dynamic Array)",
          unit: "Lecture 16",
          summary: "滿了加倍、剩 25% 時減半的搬移策略，以及 Insert $3、Delete $2 的攤銷分析。",
          tags: ["攤銷分析", "資料結構"],
          sources: ["Algo-Lecture-16.pdf"],
          updated: "2026-11-16"
        }
      ]
    },
    {
      slug: "data-structures",
      name: "資料結構",
      folder: "資料結構",
      icon: "assets/icons/data-structures.png",
      color: "blue",
      description: "Data Structures（Yi-Shin Chen）講義整理",
      notes: [
        {
          file: "01-algorithms-and-complexity.html",
          title: "演算法與複雜度分析 (Algorithms & Complexity)",
          unit: "Session 1",
          summary: "演算法的條件、pseudocode、space / time complexity，以及 O、Ω、Θ 漸進符號。",
          tags: ["複雜度分析"],
          sources: ["Session1-Algorithms Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "02-cpp-review.html",
          title: "C++ 複習 (C++ Review)",
          unit: "Session 2",
          summary: "資料抽象與封裝、pointer vs reference、class、constructor / destructor、繼承與多型。",
          tags: ["C++", "物件導向"],
          sources: ["Session2 - C++ Review Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "03-arrays.html",
          title: "陣列：多項式與稀疏矩陣 (Arrays)",
          unit: "Session 3",
          summary: "用陣列表示多項式與矩陣；稀疏矩陣的三種轉置與 Fast Transpose O(terms + cols)。",
          tags: ["線性結構", "矩陣"],
          sources: ["Session3-Arrays Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "04-stacks-and-queues.html",
          title: "堆疊與佇列 (Stacks & Queues)",
          unit: "Session 4",
          summary: "LIFO 與 FIFO、circular queue 與容量加倍，以及用 stack 做 postfix 求值與 infix 轉換。",
          tags: ["線性結構", "運算式"],
          sources: ["Session4-Stacks and Queues Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "05-linked-lists.html",
          title: "鏈結串列 (Linked Lists)",
          unit: "Session 5",
          summary: "Singly / circular / doubly linked list 的操作、用 linked structure 表示稀疏矩陣、iterator。",
          tags: ["線性結構", "矩陣"],
          sources: ["Session5-Linked Lists PPT Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "06-trees.html",
          title: "樹 (Trees)",
          unit: "Session 6",
          summary: "Binary tree 與走訪、heap 與 priority queue、BST、forest，以及 disjoint sets 的 union / find。",
          tags: ["樹"],
          sources: ["Session6-Trees Handout.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "07-graphs.html",
          title: "圖 (Graphs)",
          unit: "Session 7",
          summary: "圖的表示、DFS / BFS、最小生成樹（Kruskal、Prim、Sollin）、Dijkstra 與 Floyd-Warshall、topological order。",
          tags: ["圖論", "最短路徑"],
          sources: ["Session7-Graphs_240508_093837.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "08-sorting.html",
          title: "排序 (Sorting)",
          unit: "Session 8",
          summary: "Insertion、Quick、Merge、Heap、Radix sort 的比較，external sort 與 Huffman codes。",
          tags: ["排序", "編碼"],
          sources: ["Session8 - Sorting_240526_172425.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "09-hashing.html",
          title: "雜湊 (Hashing)",
          unit: "Session 9",
          summary: "Hash table 與 hash function、collision 與 overflow，以及 dynamic hashing 和 linear hashing。",
          tags: ["雜湊"],
          sources: ["Session9 - Hashing_240520_110816.pdf"],
          updated: "2026-11-16"
        },
        {
          file: "10-balanced-search-trees.html",
          title: "平衡搜尋樹：AVL、B-tree、B+-tree (Balanced Search Trees)",
          unit: "Session 10",
          summary: "AVL tree 的四種旋轉、B-tree 的分裂與合併，以及 B+-tree 和 B-tree 的差異。",
          tags: ["樹"],
          sources: ["Session10 - Advanced Topics_240529_093517.pdf"],
          updated: "2026-11-16"
        }
      ]
    }
  ]
};
