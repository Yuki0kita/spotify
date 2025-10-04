import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const AimyonNetworkGraph = () => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [stats, setStats] = useState({ nodes: 0, genres: 0 });

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 1200;
    const height = 800;

    const nodes = [
      { id: "あいみょん", group: "j-pop-main", genre: "J-POP" },
      { id: "米津玄師", group: "j-pop", genre: "J-POP" },
      { id: "YOASOBI", group: "j-pop", genre: "J-POP" },
      { id: "King Gnu", group: "j-pop", genre: "J-POP" },
      { id: "Official髭男dism", group: "j-pop", genre: "J-POP" },
      { id: "back number", group: "j-pop", genre: "J-POP" },
      { id: "優里", group: "j-pop", genre: "J-POP" },
      { id: "菅田将暉", group: "j-pop", genre: "J-POP" },
      { id: "Mrs. GREEN APPLE", group: "j-pop", genre: "J-POP" },
      { id: "緑黄色社会", group: "j-pop", genre: "J-POP" },
      
      { id: "RADWIMPS", group: "j-rock", genre: "J-ROCK" },
      { id: "スピッツ", group: "j-rock", genre: "J-ROCK" },
      { id: "BUMP OF CHICKEN", group: "j-rock", genre: "J-ROCK" },
      { id: "[Alexandros]", group: "j-rock", genre: "J-ROCK" },
      { id: "フジファブリック", group: "j-rock", genre: "J-ROCK" },
      
      { id: "Vaundy", group: "indie", genre: "インディー" },
      { id: "ずっと真夜中でいいのに。", group: "indie", genre: "インディー" },
      { id: "ヨルシカ", group: "indie", genre: "インディー" },
      { id: "Creepy Nuts", group: "indie", genre: "インディー" },
      
      { id: "藤井風", group: "neo-soul", genre: "ソウル/R&B" },
      { id: "Suchmos", group: "neo-soul", genre: "ソウル/R&B" },
      
      { id: "Ado", group: "vocaloid", genre: "ボーカロイド" },
      { id: "Eve", group: "vocaloid", genre: "ボーカロイド" },
      { id: "ヨアソビ", group: "vocaloid", genre: "ボーカロイド" },
      
      { id: "LiSA", group: "anime", genre: "アニメ" },
      { id: "Aimer", group: "anime", genre: "アニメ" },
      
      { id: "松任谷由実", group: "new-music", genre: "ニューミュージック" },
      { id: "中島みゆき", group: "new-music", genre: "ニューミュージック" },
      { id: "荒井由実", group: "new-music", genre: "ニューミュージック" },
      
      { id: "サザンオールスターズ", group: "showa", genre: "昭和歌謡" },
      { id: "山下達郎", group: "showa", genre: "昭和歌謡" },
      { id: "竹内まりや", group: "showa", genre: "昭和歌謡" },
      
      { id: "Billie Eilish", group: "overseas-pop", genre: "海外ポップ" },
      { id: "Taylor Swift", group: "overseas-pop", genre: "海外ポップ" },
      { id: "Ed Sheeran", group: "overseas-pop", genre: "海外ポップ" },
      
      { id: "Arctic Monkeys", group: "overseas-rock", genre: "海外ロック" },
      { id: "The 1975", group: "overseas-rock", genre: "海外ロック" },
      { id: "Radiohead", group: "overseas-rock", genre: "海外ロック" }
    ];

    const links = [
      { source: "あいみょん", target: "米津玄師", value: 10 },
      { source: "あいみょん", target: "YOASOBI", value: 9 },
      { source: "あいみょん", target: "King Gnu", value: 8 },
      { source: "あいみょん", target: "Official髭男dism", value: 8 },
      { source: "あいみょん", target: "back number", value: 7 },
      { source: "あいみょん", target: "優里", value: 7 },
      { source: "あいみょん", target: "菅田将暉", value: 6 },
      { source: "あいみょん", target: "RADWIMPS", value: 6 },
      { source: "あいみょん", target: "スピッツ", value: 5 },
      { source: "あいみょん", target: "Vaundy", value: 7 },
      { source: "あいみょん", target: "ずっと真夜中でいいのに。", value: 6 },
      { source: "あいみょん", target: "藤井風", value: 6 },
      { source: "あいみょん", target: "松任谷由実", value: 4 },
      { source: "あいみょん", target: "中島みゆき", value: 4 },
      
      { source: "米津玄師", target: "YOASOBI", value: 5 },
      { source: "米津玄師", target: "King Gnu", value: 5 },
      { source: "Official髭男dism", target: "Mrs. GREEN APPLE", value: 6 },
      { source: "back number", target: "優里", value: 5 },
      { source: "King Gnu", target: "Mrs. GREEN APPLE", value: 4 },
      
      { source: "RADWIMPS", target: "BUMP OF CHICKEN", value: 5 },
      { source: "スピッツ", target: "BUMP OF CHICKEN", value: 4 },
      { source: "RADWIMPS", target: "[Alexandros]", value: 4 },
      
      { source: "Vaundy", target: "ずっと真夜中でいいのに。", value: 5 },
      { source: "Vaundy", target: "ヨルシカ", value: 4 },
      { source: "ずっと真夜中でいいのに。", target: "ヨルシカ", value: 4 },
      
      { source: "Ado", target: "Eve", value: 5 },
      { source: "YOASOBI", target: "Ado", value: 4 },
      
      { source: "LiSA", target: "Aimer", value: 4 },
      
      { source: "松任谷由実", target: "荒井由実", value: 3 },
      { source: "松任谷由実", target: "中島みゆき", value: 4 },
      
      { source: "山下達郎", target: "竹内まりや", value: 5 },
      { source: "サザンオールスターズ", target: "山下達郎", value: 4 },
      
      { source: "Billie Eilish", target: "Taylor Swift", value: 4 },
      { source: "Taylor Swift", target: "Ed Sheeran", value: 4 },
      
      { source: "Arctic Monkeys", target: "The 1975", value: 4 },
      { source: "Arctic Monkeys", target: "Radiohead", value: 3 },
      
      { source: "米津玄師", target: "Ado", value: 4 },
      { source: "King Gnu", target: "Vaundy", value: 5 },
      { source: "藤井風", target: "Suchmos", value: 4 },
      { source: "YOASOBI", target: "LiSA", value: 3 },
      { source: "スピッツ", target: "松任谷由実", value: 3 },
      { source: "山下達郎", target: "松任谷由実", value: 4 },
      { source: "RADWIMPS", target: "Arctic Monkeys", value: 3 }
    ];

    const genreSet = new Set(nodes.map(n => n.genre));
    setStats({ nodes: nodes.length, genres: genreSet.size });

    // Spotify風カラーパレット
    const colorScale = d3.scaleOrdinal()
      .domain(["J-POP", "J-ROCK", "インディー", "ソウル/R&B", "ボーカロイド", "アニメ", "ニューミュージック", "昭和歌謡", "海外ポップ", "海外ロック"])
      .range(["#1DB954", "#1ED760", "#1FDF64", "#FF6B6B", "#AF52DE", "#FF375F", "#30D5C8", "#FFA726", "#42A5F5", "#AB47BC"]);
    
    // アーティストごとのグラデーション色を生成
    const getArtistGradient = (id, genre) => {
      const baseColor = colorScale(genre);
      const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const hue = hash % 360;
      return {
        start: baseColor,
        end: `hsl(${hue}, 70%, 45%)`
      };
    };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("background", "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)");

    const g = svg.append("g");
    
    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    
    svg.call(zoom);

    // グロー効果用のフィルター
    const defs = svg.append("defs");
    
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    // 各アーティスト用のグラデーション定義
    nodes.forEach((node, i) => {
      const gradient = getArtistGradient(node.id, node.genre);
      const gradientDef = defs.append("radialGradient")
        .attr("id", `gradient-${i}`)
        .attr("cx", "30%")
        .attr("cy", "30%");
      
      gradientDef.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", gradient.start)
        .attr("stop-opacity", 1);
      
      gradientDef.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", gradient.end)
        .attr("stop-opacity", 1);
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links)
        .id(d => d.id)
        .distance(d => 100 - d.value * 3))
      .force("charge", d3.forceManyBody()
        .strength(d => d.id === "あいみょん" ? -800 : -300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#535353")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", d => Math.sqrt(d.value) * 0.5);

    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", d => d.id === "あいみょん" ? 22 : 11)
      .attr("fill", (d, i) => `url(#gradient-${i})`)
      .attr("stroke", d => d.id === "あいみょん" ? "#1DB954" : "#282828")
      .attr("stroke-width", d => d.id === "あいみょん" ? 4 : 2)
      .attr("filter", d => d.id === "あいみょん" ? "url(#glow)" : "none")
      .style("transition", "all 0.3s ease");
    
    // アイコン内にイニシャルを表示
    node.append("text")
      .text(d => {
        // 日本語の場合は最初の1文字、英語の場合は最初の1-2文字
        if (d.id.match(/[ぁ-んァ-ヶー一-龠]/)) {
          return d.id.charAt(0);
        } else {
          const words = d.id.split(' ');
          if (words.length > 1) {
            return words[0].charAt(0) + words[1].charAt(0);
          }
          return d.id.substring(0, 2);
        }
      })
      .attr("x", 0)
      .attr("y", d => d.id === "あいみょん" ? 8 : 4)
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.id === "あいみょん" ? "14px" : "8px")
      .attr("font-weight", "bold")
      .attr("fill", "#FFFFFF")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .style("pointer-events", "none")
      .style("text-shadow", "0 1px 3px rgba(0,0,0,0.9)")
      .attr("opacity", 0.9);

    // アーティスト名ラベル
    node.append("text")
      .text(d => d.id)
      .attr("x", 0)
      .attr("y", d => d.id === "あいみょん" ? -28 : -16)
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.id === "あいみょん" ? "15px" : "11px")
      .attr("font-weight", d => d.id === "あいみょん" ? "bold" : "500")
      .attr("fill", "#FFFFFF")
      .attr("font-family", "'Helvetica Neue', Arial, sans-serif")
      .style("pointer-events", "none")
      .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)");

    node.on("mouseover", function(event, d) {
      setSelectedNode(d);
      
      d3.select(this).select("circle")
        .attr("stroke-width", d => d.id === "あいみょん" ? 6 : 4)
        .attr("stroke", "#1DB954")
        .attr("filter", "url(#glow)")
        .transition()
        .duration(200)
        .attr("r", d => d.id === "あいみょん" ? 24 : 13);
      
      link.attr("stroke", l => 
        (l.source.id === d.id || l.target.id === d.id) ? "#1DB954" : "#535353"
      )
      .attr("stroke-opacity", l => 
        (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.15
      )
      .attr("stroke-width", l => 
        (l.source.id === d.id || l.target.id === d.id) ? Math.sqrt(l.value) * 1.5 : Math.sqrt(l.value) * 0.5
      );
      
      node.select("circle").attr("opacity", n => {
        if (n.id === d.id) return 1;
        const connected = links.some(l => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        );
        return connected ? 1 : 0.25;
      });
      
      node.selectAll("text").attr("opacity", n => {
        if (n.id === d.id) return 1;
        const connected = links.some(l => 
          (l.source.id === d.id && l.target.id === n.id) ||
          (l.target.id === d.id && l.source.id === n.id)
        );
        return connected ? 1 : 0.3;
      });
    })
    .on("mouseout", function(event, d) {
      d3.select(this).select("circle")
        .attr("stroke-width", d => d.id === "あいみょん" ? 4 : 2)
        .attr("stroke", d => d.id === "あいみょん" ? "#1DB954" : "#282828")
        .attr("filter", d => d.id === "あいみょん" ? "url(#glow)" : "none")
        .transition()
        .duration(200)
        .attr("r", d => d.id === "あいみょん" ? 22 : 11);
      
      link.attr("stroke", "#535353")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", d => Math.sqrt(d.value) * 0.5);
      
      node.select("circle").attr("opacity", 1);
      node.selectAll("text").attr("opacity", function() {
        // イニシャルは常に0.9、アーティスト名は1
        return d3.select(this).attr("y") > 0 ? 0.9 : 1;
      });
    });

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  const genres = [
    { name: "J-POP", color: "#1DB954" },
    { name: "J-ROCK", color: "#1ED760" },
    { name: "インディー", color: "#1FDF64" },
    { name: "ソウル/R&B", color: "#FF6B6B" },
    { name: "ボーカロイド", color: "#AF52DE" },
    { name: "アニメ", color: "#FF375F" },
    { name: "ニューミュージック", color: "#30D5C8" },
    { name: "昭和歌謡", color: "#FFA726" },
    { name: "海外ポップ", color: "#42A5F5" },
    { name: "海外ロック", color: "#AB47BC" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
              <span className="text-2xl">🎵</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                あいみょん リスニングネットワーク
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                音楽の繋がりを可視化する、データドリブンな音楽体験
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">関連アーティスト</p>
                <p className="text-4xl font-bold text-green-400">{stats.nodes}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">ジャンル</p>
                <p className="text-4xl font-bold text-green-400">{stats.genres}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🎸</span>
              </div>
            </div>
          </div>
        </div>

        {selectedNode && (
          <div className="mb-6 bg-gradient-to-r from-green-500/10 to-green-600/10 border-l-4 border-green-500 rounded-r-xl p-4 shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">🎤</span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Now Playing</p>
                <p className="text-xl font-bold text-white">{selectedNode.id}</p>
                <p className="text-sm text-green-400">{selectedNode.genre}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden mb-6 backdrop-blur-sm">
          <div className="p-6">
            <svg ref={svgRef} className="rounded-2xl"></svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400">⚡</span>
              操作方法
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <span className="text-sm">🖱️</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">ドラッグ</p>
                  <p className="text-gray-400 text-xs">ノードをドラッグして配置調整</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <span className="text-sm">👆</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">ホバー</p>
                  <p className="text-gray-400 text-xs">関連性をハイライト表示</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                  <span className="text-sm">🔍</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">ズーム</p>
                  <p className="text-gray-400 text-xs">ホイールで拡大縮小、ドラッグで移動</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400">🎨</span>
              ジャンル凡例
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {genres.map(genre => (
                <div 
                  key={genre.name} 
                  className="flex items-center gap-2 group hover:bg-gray-700/30 p-2 rounded-lg transition-all cursor-pointer"
                >
                  <div 
                    className="w-4 h-4 rounded-full shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform" 
                    style={{ 
                      backgroundColor: genre.color,
                      boxShadow: `0 0 10px ${genre.color}40`
                    }}
                  ></div>
                  <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs">
          <p>Powered by Spotify API × D3.js</p>
        </div>
      </div>
    </div>
  );
};

export default AimyonNetworkGraph;
