"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export default function DigitFitPage() {
  useEffect(() => {
    // --- 1. GAME LOGIC ---
    const BOARD_SIZE = 11;
    const DIGITS = {
      0: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      1: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      2: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ],
      3: [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      4: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      5: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
      6: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      7: [
        [1, 1, 1],
        [1, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      8: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      9: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    };

    const boardEl = document.getElementById("board");
    const trayEl = document.getElementById("tray");
    const pieces = [];
    let selectedPiece = null;
    let dragOffset = { x: 0, y: 0 };
    let isDragging = false;

    function getCellSize() {
      return window.innerWidth <= 500 ? 32 : 40;
    }

    function drawPiece(p) {
      p.element.innerHTML = "";
      const s = getCellSize();
      p.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (!cell) return;
          const b = document.createElement("div");
          b.className = "block";
          b.style.width = b.style.height = s + "px";
          b.style.left = x * s + "px";
          b.style.top = y * s + "px";
          const border = "2px solid #2d3436";
          if (!p.shape[y - 1]?.[x]) b.style.borderTop = border;
          if (!p.shape[y + 1]?.[x]) b.style.borderBottom = border;
          if (!p.shape[y][x - 1]) b.style.borderLeft = border;
          if (!p.shape[y][x + 1]) b.style.borderRight = border;
          p.element.appendChild(b);
        });
      });
      p.element.style.width = p.shape[0].length * s + "px";
      p.element.style.height = p.shape.length * s + "px";
    }

    function createPiece(num) {
      const el = document.createElement("div");
      el.className = "piece in-tray";
      const obj = { digit: num, shape: DIGITS[num], x: -1, y: -1, element: el };
      drawPiece(obj);
      trayEl.appendChild(el);
      pieces.push(obj);

      const start = (e) => {
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        const pageY = e.touches ? e.touches[0].pageY : e.pageY;
        if (selectedPiece) selectedPiece.element.classList.remove("selected");
        selectedPiece = obj;
        selectedPiece.element.classList.add("selected", "dragging");
        const rect = el.getBoundingClientRect();
        dragOffset.x = clientX - rect.left;
        dragOffset.y = clientY - rect.top;
        isDragging = true;
        el.classList.remove("in-tray");
        document.body.appendChild(el);
        updatePosition(pageX, pageY, clientX, clientY);
      };
      el.addEventListener("mousedown", start);
      el.addEventListener("touchstart", start, { passive: false });
    }

    function updatePosition(pageX, pageY, clientX, clientY) {
      if (!isDragging || !selectedPiece) return;
      const size = getCellSize();
      const boardRect = boardEl.getBoundingClientRect();
      let targetX = pageX - dragOffset.x;
      let targetY = pageY - dragOffset.y;
      const bSnapX = clientX - dragOffset.x;
      const bSnapY = clientY - dragOffset.y;
      if (
        bSnapX > boardRect.left - size / 2 &&
        bSnapX < boardRect.right - size / 2 &&
        bSnapY > boardRect.top - size / 2 &&
        bSnapY < boardRect.bottom - size / 2
      ) {
        const gx = Math.round((bSnapX - boardRect.left) / size);
        const gy = Math.round((bSnapY - boardRect.top) / size);
        if (canPlace(selectedPiece, gx, gy)) {
          targetX = boardRect.left + window.scrollX + gx * size;
          targetY = boardRect.top + window.scrollY + gy * size;
        }
      }
      selectedPiece.element.style.left = targetX + "px";
      selectedPiece.element.style.top = targetY + "px";
    }

    function canPlace(p, gx, gy) {
      for (let y = 0; y < p.shape.length; y++) {
        for (let x = 0; x < p.shape[y].length; x++) {
          if (!p.shape[y][x]) continue;
          const bx = gx + x,
            by = gy + y;
          if (bx < 0 || by < 0 || bx >= BOARD_SIZE || by >= BOARD_SIZE)
            return false;
          for (const other of pieces) {
            if (other === p || other.x === -1) continue;
            for (let oy = 0; oy < other.shape.length; oy++) {
              for (let ox = 0; ox < other.shape[oy].length; ox++) {
                if (
                  other.shape[oy][ox] &&
                  other.x + ox === bx &&
                  other.y + oy === by
                )
                  return false;
              }
            }
          }
        }
      }
      return true;
    }

    window.handleRotate = function () {
      if (!selectedPiece) return;
      const s = selectedPiece.shape;
      selectedPiece.shape = s[0].map((_, c) => s.map((r) => r[c]).reverse());
      drawPiece(selectedPiece);
      if (selectedPiece.x !== -1) {
        if (!canPlace(selectedPiece, selectedPiece.x, selectedPiece.y)) {
          selectedPiece.x = -1;
          selectedPiece.y = -1;
          selectedPiece.element.classList.add("in-tray");
          trayEl.appendChild(selectedPiece.element);
        } else {
          const size = getCellSize();
          selectedPiece.element.style.left = selectedPiece.x * size + "px";
          selectedPiece.element.style.top = selectedPiece.y * size + "px";
        }
      }
    };

    window.handleFlip = function () {
      if (!selectedPiece) return;
      selectedPiece.shape = selectedPiece.shape.map((row) =>
        [...row].reverse(),
      );
      drawPiece(selectedPiece);
    };

    const endHandler = (e) => {
      if (!isDragging || !selectedPiece) return;
      isDragging = false;
      selectedPiece.element.classList.remove("dragging");
      const size = getCellSize();
      const boardRect = boardEl.getBoundingClientRect();
      const gx = Math.round(
        (parseFloat(selectedPiece.element.style.left) -
          (boardRect.left + window.scrollX)) /
          size,
      );
      const gy = Math.round(
        (parseFloat(selectedPiece.element.style.top) -
          (boardRect.top + window.scrollY)) /
          size,
      );
      if (canPlace(selectedPiece, gx, gy)) {
        selectedPiece.x = gx;
        selectedPiece.y = gy;
        selectedPiece.element.style.left = gx * size + "px";
        selectedPiece.element.style.top = gy * size + "px";
        boardEl.appendChild(selectedPiece.element);
      } else {
        selectedPiece.x = -1;
        selectedPiece.y = -1;
        selectedPiece.element.classList.add("in-tray");
        trayEl.insertBefore(selectedPiece.element, trayEl.firstChild);
      }
      checkWin();
    };

    function checkWin() {
      if (pieces.every((p) => p.x !== -1)) {
        if (window.confetti)
          window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          });
        if (navigator.share)
          document.getElementById("native-share-btn").style.display = "flex";
        setTimeout(
          () => (document.getElementById("win-modal").style.display = "flex"),
          600,
        );
      }
    }

    // --- SHARE HANDLERS ---
    const shareMsg =
      "I just solved the DigitFit Puzzle! 🧩 It's a real brain teaser. Can you fit all 10 digits?";
    // const shareUrl = window.location.href;
    const shareUrl = "https://www.avizitrx.com/projects/web-development/digit-fit-puzzle";

    window.nativeShare = () =>
      navigator.share({
        title: "DigitFit Puzzle",
        text: shareMsg,
        url: shareUrl,
      });

    window.socialLink = (platform) => {
      let url = "";
      switch (platform) {
        case "x":
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMsg)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case "whatsapp":
          url = `https://wa.me/?text=${encodeURIComponent(shareMsg + " " + shareUrl)}`;
          break;
        case "telegram":
          url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMsg)}`;
          break;
        case "linkedin":
          navigator.clipboard.writeText(shareMsg + " " + shareUrl);
          alert("Message copied! Paste it in your LinkedIn post.");
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
          break;
      }
      window.open(url, "_blank");
    };

    window.copyLink = () => {
      navigator.clipboard.writeText(shareMsg + " " + shareUrl);
      document.getElementById("copy-status").style.display = "block";
      setTimeout(
        () => (document.getElementById("copy-status").style.display = "none"),
        3000,
      );
    };

    // --- INITIALIZATION ---
    trayEl.innerHTML = "";
    for (let i = 0; i <= 9; i++) createPiece(i);

    document.addEventListener("mousemove", (e) =>
      updatePosition(e.pageX, e.pageY, e.clientX, e.clientY),
    );
    document.addEventListener(
      "touchmove",
      (e) =>
        updatePosition(
          e.touches[0].pageX,
          e.touches[0].pageY,
          e.touches[0].clientX,
          e.touches[0].clientY,
        ),
      { passive: false },
    );
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchend", (e) =>
      endHandler(e.changedTouches[0]),
    );

    const keyListener = (e) => {
      if (e.key.toLowerCase() === "r") window.handleRotate();
      if (e.key.toLowerCase() === "f") window.handleFlip();
    };
    document.addEventListener("keydown", keyListener);

    // Load Confetti Script
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
                    :root { --cell: 40px; --primary: #4a90e2; --accent: #f39c12; --text: #2d3436; }
                    @media (max-width: 500px) { :root { --cell: 32px; } }
                    #game-container { font-family: 'Segoe UI', system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; gap: 15px; user-select: none; text-align: center; color: var(--text); }
                    #board { position: relative; width: calc(11 * var(--cell)); height: calc(11 * var(--cell)); border: 3px solid #2d3436; background: #fff; background-image: linear-gradient(#eee 1px, transparent 1px), linear-gradient(90deg, #eee 1px, transparent 1px); background-size: var(--cell) var(--cell); box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin: 0 auto; }
                    #tray { width: 90%; min-height: 140px; padding: 15px; border-radius: 12px; background: #dfe6e9; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; border: 2px dashed #b2bec3; margin: 20px auto 50px auto; }
                    .piece { position: absolute; cursor: grab; touch-action: none; z-index: 10; }
                    .piece.selected .block { background: #e67e22 !important; border: 0.5px solid rgba(255,255,255,0.4) !important; }
                    .piece.in-tray { position: relative !important; left: 0 !important; top: 0 !important; transform: scale(0.7); }
                    .block { position: absolute; background: var(--accent); box-sizing: border-box; }
                    .controls { display: flex; gap: 10px; justify-content: center; margin: 10px 0; }
                    .btn { padding: 12px 18px; border: none; border-radius: 8px; background: var(--primary); color: white; font-weight: bold; cursor: pointer; box-shadow: 0 4px 0 #2980b9; }
                    #win-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 2000; justify-content: center; align-items: center; }
                    .modal-content { background: white; padding: 25px; border-radius: 20px; width: 90%; max-width: 400px; text-align: center; color: #333; }
                    .share-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
                    .share-btn { display: flex; flex-direction: column; align-items: center; text-decoration: none; font-size: 10px; color: #666; cursor: pointer; }
                    .share-btn svg { width: 40px; height: 40px; margin-bottom: 5px; }
                `,
          }}
        />

        <div id="game-container">
          <header>
            <h1 style={{ margin: 0, fontSize: "2rem", color: "#FFFFFF" }}>DigitFit</h1>
            <p style={{ fontSize: "0.9rem", color: "#FFFFFF" }}>
              Snap all 10 digits to win!
            </p>
          </header>

          <div className="controls">
            <button className="btn" onClick={() => window.handleRotate()}>
              Rotate (R)
            </button>
            <button
              className="btn"
              style={{ background: "#636e72", boxShadow: "0 4px 0 #2d3436" }}
              onClick={() => window.handleFlip()}
            >
              Flip (F)
            </button>
          </div>

          <div id="board"></div>
          <div id="tray"></div>
        </div>

        <div id="win-modal">
          <div className="modal-content">
            <h2 style={{ marginTop: 0 }}>Puzzle Solved! 🎉</h2>
            <p>You have a great sense of geometry. Share your victory:</p>

            <div className="share-grid">
              <a
                className="share-btn"
                id="native-share-btn"
                onClick={() => window.nativeShare()}
                style={{ display: "none" }}
              >
                <svg viewBox="0 0 24 24" fill="#4a90e2">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                More
              </a>
              <a className="share-btn" onClick={() => window.socialLink("x")}>
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>
              <a
                className="share-btn"
                onClick={() => window.socialLink("whatsapp")}
              >
                <svg viewBox="0 0 448 512">
                  <path
                    fill="#25D366"
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
                </svg>
                WhatsApp
              </a>
              <a
                className="share-btn"
                onClick={() => window.socialLink("facebook")}
              >
                <svg viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                className="share-btn"
                onClick={() => window.socialLink("telegram")}
              >
                <svg viewBox="0 0 24 24" fill="#0088cc">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2s-.21-.05-.3-.03c-.11.02-1.85 1.18-5.23 3.46-.5.34-.95.5-1.34.49-.43-.01-1.26-.24-1.88-.44-.76-.25-1.36-.39-1.3-.82.03-.22.33-.44.89-.67 3.5-1.52 5.83-2.52 7-2.99 3.32-1.33 4.01-1.56 4.46-1.56.1 0 .33.02.47.14.12.1.15.24.16.33.01.03.02.16.01.19z" />
                </svg>
                Telegram
              </a>
              <a
                className="share-btn"
                onClick={() => window.socialLink("linkedin")}
              >
                <svg viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
              <a className="share-btn" onClick={() => window.copyLink()}>
                <svg viewBox="0 0 24 24" fill="#636e72">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                Link
              </a>
            </div>
            <div
              id="copy-status"
              style={{ display: "none", color: "green", fontSize: "12px" }}
            >
              Link copied!
            </div>
            <button
              className="btn"
              style={{
                width: "100%",
                marginTop: "10px",
                background: "#636e72",
              }}
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
