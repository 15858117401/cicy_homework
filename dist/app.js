(() => {
  "use strict";

  const data = window.AW_DATA;
  const app = document.getElementById("app");
  const state = { focused: "A", cardSide: "front", profileKey: null };

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const known = (value) => value == null || value === "" ? '<span class="unprovided" aria-label="Not supplied">—</span>' : esc(value);
  const route = () => location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const link = (path) => `#/${path}`;

  function header(page) {
    const item = (key, label, url) => `<a class="nav-link ${page === key ? "is-current" : ""}" href="${link(url)}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`;
    return `<header class="site-header">
      <a class="brand" href="${link("dashboard")}" aria-label="Aesthetic Work, Dashboard"><span>AESTHETIC</span><span class="brand-slash">/</span><span>WORK</span></a>
      <nav class="desktop-nav" aria-label="Main navigation">
        ${item("dashboard", "Dashboard", "dashboard")}
        ${item("job", "Jobs", "job")}
        ${item("candidates", "Candidates", "candidates")}
        ${item("identity", "Aesthetic Identity", "identity")}
      </nav>
      <div class="header-account"><span class="account-dot" aria-hidden="true"></span><span>Employer Account</span></div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation"><span></span><span></span></button>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
      ${item("dashboard", "Dashboard", "dashboard")}${item("job", "Jobs", "job")}${item("candidates", "Candidates", "candidates")}${item("identity", "Aesthetic Identity", "identity")}
    </nav>`;
  }

  function footer() {
    return `<footer class="site-footer"><span>AESTHETIC / WORK</span><span>EMPLOYER SYSTEM · NEW YORK 2040</span><span>01 / 01 OPEN REQUISITION</span></footer>`;
  }

  function progress(step) {
    const steps = [["01", "Requisition"], ["02", "Review"], ["03", "Decision"]];
    return `<div class="progress" aria-label="Hiring journey">${steps.map(([number, label], index) => `<span class="progress-item ${index + 1 === step ? "active" : ""} ${index + 1 < step ? "complete" : ""}"><b>${number}</b> ${label}</span>`).join("")}</div>`;
  }

  function verified() {
    return `<span class="verified"><span class="verify-icon" aria-hidden="true">✳</span> VERIFIED IDENTITY</span>`;
  }

  function dashboard() {
    const j = data.job;
    return `${header("dashboard")}<main id="main" class="dashboard-page">
      <div class="dashboard-meta"><span>EMPLOYER WORKSPACE</span><span>${esc(data.context.toUpperCase())}</span><span>STATUS / ACTIVE</span></div>
      <section class="dashboard-hero" aria-labelledby="dash-title">
        <div class="dash-index"><span>01 / 01</span><span>OPEN REQUISITION</span></div>
        <div class="dash-main"><div class="eyebrow light">CURRENT ROLE <span class="small-cross">✳</span> NEW YORK</div><h1 id="dash-title">Creative<br><em>Strategist.</em></h1><p>One open role. Two applicants. A decision shaped by experience and aesthetic credentials.</p></div>
        <div class="dash-side"><div class="dash-micro">REVIEW CYCLE<br><strong>2040 / 01</strong></div><div class="dash-vertical" aria-hidden="true">AESTHETIC IDENTITY SYSTEM</div></div>
      </section>
      <section class="requisition-strip" aria-label="Current role details">
        <div class="strip-title"><span class="micro-label">ACTIVE POSITION</span><strong>${esc(j.title)}</strong></div>
        <div><span class="micro-label">LOCATION / TYPE</span><strong>${esc(j.location)} <span class="mid-dot">·</span> ${esc(j.type)}</strong></div>
        <div><span class="micro-label">APPLICATIONS</span><strong class="strip-number">${j.applications.toString().padStart(2, "0")}</strong></div>
        <div><span class="micro-label">STATUS</span><strong><span class="status-pip"></span>${esc(j.status)}</strong></div>
        <a class="strip-action" href="${link("job")}"><span>View Applicants</span><span aria-hidden="true">↗</span></a>
      </section>
      <div class="dashboard-bottom"><span>AN AESTHETIC IDENTITY CERTIFICATION IS REQUIRED FOR THIS ROLE</span><span>SCROLL / EXPLORE <span aria-hidden="true">↓</span></span></div>
    </main>${footer()}`;
  }

  function job() {
    const j = data.job;
    return `${header("job")}<main id="main" class="light-page job-page page-pad">
      ${progress(1)}<div class="page-topline"><span>RECRUITMENT / OPEN POSITION</span><span>NEW YORK · ${j.year}</span></div>
      <section class="job-hero"><div><div class="eyebrow">ROLE BRIEF / 01</div><h1>Creative<br>Strategist<span class="period">.</span></h1></div><div class="job-hero-side"><span class="year-stamp">2040</span><p>${esc(j.location)}<br>${esc(j.type)}<br>${esc(j.status)}</p></div></section>
      <div class="job-detail-grid"><div class="section-label">01 / THE POSITION</div><div class="job-copy"><h2>Human judgment is<br>the qualification.</h2><p>${esc(j.description)}</p><div class="job-facts"><div><span>LOCATION</span><strong>${esc(j.location)}</strong></div><div><span>EMPLOYMENT</span><strong>${esc(j.type)}</strong></div><div><span>APPLICATIONS</span><strong>${j.applications.toString().padStart(2, "0")}</strong></div><div><span>JOB REFERENCE</span><strong>${known(j.reference)}</strong></div></div></div></div>
      <div class="job-detail-grid qualification-grid"><div class="section-label">02 / REQUIRED QUALIFICATIONS</div><div class="qualification-content"><div class="qualification-list">${j.qualifications.map((q, i) => `<div><span>${String(i+1).padStart(2,"0")}</span><strong>${esc(q)}</strong><span aria-hidden="true">↗</span></div>`).join("")}</div><div class="threshold-band"><div><span>MINIMUM TASTE INDEX</span><strong>${j.minimumTaste}<small>/100</small></strong></div><p>${esc(j.requiredStatement)}</p></div></div></div>
      <div class="page-end-action"><span>02 APPLICATIONS READY FOR REVIEW</span><a class="button button-dark" href="${link("candidates")}">Review Applicants <span aria-hidden="true">↗</span></a></div>
    </main>${footer()}`;
  }

  function candidateCard(key) {
    const c = data.candidates[key];
    const meets = c.taste >= data.job.minimumTaste;
    return `<article class="candidate-card ${state.focused === key ? "is-focused" : ""}" data-candidate="${key}">
      <div class="candidate-card-head"><span>0${key === "A" ? 1 : 2} / APPLICANT</span><button type="button" class="focus-button" data-focus="${key}" aria-pressed="${state.focused === key}">${state.focused === key ? "IN FOCUS" : "FOCUS CANDIDATE"}<span class="focus-circle" aria-hidden="true"></span></button></div>
      <div class="candidate-portrait"><img src="${esc(c.portrait)}" alt="Provisional editorial portrait for ${esc(c.label)}" /><div class="portrait-label"><span>${esc(c.label.toUpperCase())}</span><span>IDENTITY / ${c.verified ? "VERIFIED" : "PENDING"}</span></div></div>
      <div class="candidate-name-row"><div><span class="micro-label">APPLICANT PROFILE</span><h2>${esc(c.label)}</h2><p>${esc(c.framing)}</p></div><span class="card-symbol" aria-hidden="true">✳</span></div>
      <div class="candidate-metrics"><div class="metric-primary"><span>TASTE INDEX</span><strong>${c.taste}<small>/100</small></strong></div><div class="metric-secondary"><div><span>PROFESSIONAL EXPERIENCE</span><strong>${c.experience} <small>YEARS</small></strong></div><div><span>ORIGINALITY</span><strong>${c.originality}<small>/100</small></strong></div></div></div>
      <div class="threshold-line"><span class="threshold-track"><i style="width:${c.taste}%"></i><b style="left:${data.job.minimumTaste}%"></b></span><div><span>${esc(c.qualification)}</span><span>MIN. ${data.job.minimumTaste}</span></div></div>
      <div class="candidate-card-foot">${verified()}<a class="text-action" href="${link(`profile/${key}`)}">View Profile <span aria-hidden="true">↗</span></a></div>
    </article>`;
  }

  function candidates() {
    return `${header("candidates")}<main id="main" class="light-page comparison-page page-pad">
      ${progress(2)}<div class="page-topline"><span>ROLE / CREATIVE STRATEGIST</span><span>02 CANDIDATES · 01 DECISION</span></div>
      <section class="comparison-intro"><div><div class="eyebrow">APPLICANT REVIEW / 2040</div><h1>Compare the<br><em>candidates.</em></h1></div><div class="comparison-intro-right"><p>Review professional experience alongside certified aesthetic credentials.</p><div><span>REQUIRED TASTE INDEX</span><strong>${data.job.minimumTaste}<small>/100</small></strong></div></div></section>
      <div class="comparison-toolbar"><span>DIRECT COMPARISON <span class="toolbar-count">02 / 02</span></span><span>SELECT A PROFILE TO EXAMINE</span></div>
      <section class="candidate-grid" aria-label="Candidate comparison">${candidateCard("A")}${candidateCard("B")}</section>
      <section class="comparison-decision"><div><span class="eyebrow light">REVIEW STAGE / FINAL</span><h2>Ready to make<br>a decision?</h2></div><a class="button button-light" href="${link("decision")}">Proceed to Decision <span aria-hidden="true">↗</span></a></section>
    </main>${footer()}`;
  }

  function scoreRow(label, value) {
    return `<div class="score-row"><span>${label}</span><div class="score-bar">${value == null ? "" : `<i style="width:${value}%"></i>`}</div><strong>${value == null ? "—" : `${value}<small>/100</small>`}</strong></div>`;
  }

  function identityCard(c) {
    const back = state.cardSide === "back";
    return `<div class="identity-card ${back ? "card-back" : ""}" aria-label="Digital Aesthetic Identity Card, ${back ? "back" : "front"}">
      <div class="identity-card-top"><span>AESTHETIC <b>/</b> IDENTITY</span><span>✳</span></div>
      ${back ? `<div class="identity-card-back-copy"><span>CERTIFICATION RECORD</span><strong>${esc(c.label)}</strong><p>Aesthetic identity status<br>${c.verified ? "VERIFIED" : "PENDING"}</p></div>` : `<div class="identity-card-center"><div><span>CARDHOLDER</span><strong>${esc(c.name || c.label)}</strong></div><div class="card-index">AI / 2040</div></div><div class="identity-card-bottom"><div><span>IDENTITY NO.</span><strong>${known(c.identityNumber)}</strong></div><div><span>CLASSIFICATION</span><strong>${known(c.classification)}</strong></div><div><span>TASTE INDEX</span><strong>${c.taste}/100</strong></div><div><span>STATUS</span><strong>${c.verified ? "VERIFIED" : "PENDING"}</strong></div></div>`}
    </div>`;
  }

  function profile(key) {
    const c = data.candidates[key];
    state.focused = key;
    return `${header("candidates")}<main id="main" class="light-page profile-page page-pad">
      ${progress(2)}<div class="page-topline"><span>APPLICANT PROFILE / ${key}</span><a href="${link("candidates")}" class="top-back">← Back to Candidates</a></div>
      <section class="profile-hero"><div class="profile-photo"><img src="${esc(c.portrait)}" alt="Provisional editorial portrait for ${esc(c.label)}" /></div><div class="profile-overview"><div class="eyebrow">AESTHETIC RÉSUMÉ / ${key === "A" ? "01" : "02"}</div><h1>${esc(c.label)}<span class="period">.</span></h1><p>${esc(c.framing)}</p><div class="profile-overview-rule"></div><div class="profile-quick"><div><span>PROFESSIONAL EXPERIENCE</span><strong>${c.experience} years</strong></div><div><span>TASTE INDEX</span><strong>${c.taste}<small>/100</small></strong></div><div><span>IDENTITY</span>${verified()}</div></div><div class="profile-nav-actions"><a href="${link("candidates")}" class="text-action">← Back to Candidates</a><a href="${link(`profile/${key === "A" ? "B" : "A"}`)}" class="text-action">View Candidate ${key === "A" ? "B" : "A"} ↗</a></div></div></section>
      <section class="profile-section professional-section"><div class="section-label">01 / PROFESSIONAL INFORMATION</div><div class="profile-section-content"><h2>Professional<br>record.</h2><div class="information-grid"><div><span>NAME</span><strong>${esc(c.name || c.label)}</strong></div><div><span>CURRENT POSITION</span><strong>${known(c.currentPosition)}</strong></div><div><span>WORK EXPERIENCE</span><strong>${c.experience} years</strong></div><div><span>EDUCATION</span><strong>${known(c.education)}</strong></div><div><span>PROFESSIONAL SKILLS</span><strong>${known(c.professionalSkills)}</strong></div><div><span>PREVIOUS COMPANIES</span><strong>${known(c.previousCompanies)}</strong></div></div></div></section>
      <section class="profile-section aesthetic-section"><div class="section-label">02 / AESTHETIC IDENTITY</div><div class="profile-section-content"><div class="identity-section-head"><h2>Measured<br>judgment.</h2><div>${verified()}<p>Identity number ${known(c.identityNumber)}</p></div></div><div class="scores-panel">${scoreRow("TASTE INDEX", c.taste)}${scoreRow("ORIGINALITY", c.originality)}${scoreRow("VISUAL JUDGMENT", c.visualJudgment)}${scoreRow("CULTURAL AWARENESS", c.culturalAwareness)}</div><div class="identity-meta"><div><span>AESTHETIC CLASSIFICATION</span><strong>${known(c.classification)}</strong></div><div><span>CERTIFICATION DATE</span><strong>${known(c.certificationDate)}</strong></div><div><span>CANDIDATE ID</span><strong>${known(c.candidateId)}</strong></div><div><span>QUALIFICATION</span><strong>${esc(c.qualification)}</strong></div></div></div></section>
      <section class="profile-section card-section"><div class="section-label">03 / DIGITAL IDENTITY CARD</div><div class="profile-section-content"><div class="card-section-head"><h2>Digital<br>identity.</h2><div class="card-toggle" role="group" aria-label="Identity card side"><button type="button" data-side="front" aria-pressed="${state.cardSide === "front"}">FRONT</button><button type="button" data-side="back" aria-pressed="${state.cardSide === "back"}">BACK</button></div></div>${identityCard(c)}<p class="card-caption">AESTHETIC IDENTITY / VERIFIED DIGITAL RECORD</p></div></section>
      <section class="profile-section resume-section"><div class="section-label">04 / AESTHETIC RÉSUMÉ</div><div class="profile-section-content"><div class="resume-head"><h2>Beyond<br>the score.</h2><p>A visual record of direction, judgment and cultural awareness.</p></div><div class="resume-entries"><div><span>01 / PERSONAL AESTHETIC DIRECTION</span><strong>${known(c.aestheticDirection)}</strong></div><div><span>02 / CREATIVE EXPERIENCE</span><strong>${known(c.creativeExperience)}</strong></div><div><span>03 / VISUAL JUDGMENT</span><strong>${known(c.visualJudgment)}</strong></div><div><span>04 / CULTURAL AWARENESS</span><strong>${known(c.culturalAwareness)}</strong></div><div><span>05 / PERSONAL STYLE</span><strong>${known(c.personalStyle)}</strong></div></div><div class="works-header"><span>SELECTED CREATIVE WORKS</span><span>${String(c.visualWorks.length).padStart(2,"0")} / SUBMITTED</span></div>${c.visualWorks.length ? `<div class="works-grid">${c.visualWorks.map((work) => `<figure><img src="${esc(work.image)}" alt="${esc(work.alt)}" /><figcaption>${esc(work.title)}</figcaption></figure>`).join("")}</div>` : `<div class="works-empty"><div class="works-empty-mark" aria-hidden="true">✳</div><span>SELECTED WORKS</span><strong>Submission pending</strong><p>Visual work will appear here when provided.</p></div>`}</div></section>
      <div class="profile-end"><a class="text-action" href="${link("candidates")}">← Back to Candidates</a><a class="button button-dark" href="${link("decision")}">Proceed to Decision <span aria-hidden="true">↗</span></a></div>
    </main>${footer()}`;
  }

  function decision() {
    const a = data.candidates.A, b = data.candidates.B;
    const option = (key, c) => `<div class="decision-option"><div class="decision-option-top"><span>CANDIDATE ${key}</span>${verified()}</div><h2>${esc(c.label)}</h2><p>${esc(c.framing)}</p><div class="decision-option-stats"><div><span>EXPERIENCE</span><strong>${c.experience} YEARS</strong></div><div><span>TASTE INDEX</span><strong>${c.taste}/100</strong></div><div><span>ORIGINALITY</span><strong>${c.originality}/100</strong></div></div><p class="decision-qualification">${esc(c.qualification)}</p><button type="button" class="button ${key === "A" ? "button-outline" : "button-dark"}" data-hire="${key}">HIRE CANDIDATE ${key} <span aria-hidden="true">↗</span></button></div>`;
    return `${header("candidates")}<main id="main" class="light-page decision-page page-pad">${progress(3)}<div class="page-topline"><span>FINAL REVIEW / CREATIVE STRATEGIST</span><span>01 DECISION</span></div><section class="decision-intro"><span class="eyebrow">HIRING DECISION / 2040</span><h1>Who gets<br>the role<span class="period">?</span></h1><p>Both identities are verified. Their credentials point in different directions.</p></section><section class="decision-grid" aria-label="Choose a candidate">${option("A",a)}${option("B",b)}</section><div class="decision-actions"><a href="${link("candidates")}">← Return to candidates</a><a href="${link("dashboard")}">Restart experience ↗</a></div></main>${footer()}`;
  }

  function result(key) {
    const message = key === "A" ? "You prioritized professional experience over aesthetic ranking." : "You prioritized aesthetic credentials over professional experience.";
    return `${header("candidates")}<main id="main" class="result-page page-pad"><div class="result-topline"><span>HIRING DECISION / RECORDED</span><span>NEW YORK · 2040</span></div><div class="result-content"><span class="result-mark" aria-hidden="true">✳</span><div class="eyebrow light">SELECTED / CANDIDATE ${key}</div><h1>${esc(message)}</h1><div class="result-question"><span>THE QUESTION REMAINS</span><h2>Should personal taste determine someone's career opportunities?</h2></div><div class="result-actions"><a class="button button-light" href="${link("dashboard")}">Restart Experience <span aria-hidden="true">↗</span></a><a class="light-text-link" href="${link("candidates")}">← Return to candidates</a></div></div></main>${footer()}`;
  }

  function identity() {
    return `${header("identity")}<main id="main" class="light-page identity-page page-pad"><div class="page-topline"><span>AESTHETIC IDENTITY SYSTEM</span><span>NEW YORK · 2040</span></div><section class="identity-intro"><span class="eyebrow">CERTIFICATION / EMPLOYER VIEW</span><h1>Aesthetic<br>Identity<span class="period">.</span></h1><p>A verified record of taste, originality, visual judgment and cultural awareness, submitted alongside professional experience for this role.</p></section><div class="identity-rule-grid"><div><span>ROLE REQUIREMENT</span><strong>Minimum Taste Index<br>${data.job.minimumTaste}/100</strong></div><div><span>APPLICATION RECORDS</span><strong>02 verified identities</strong></div></div><div class="identity-candidate-links"><a href="${link("profile/A")}"><span>01 / ${esc(data.candidates.A.label)}</span><strong>${data.candidates.A.taste}/100</strong><span aria-hidden="true">↗</span></a><a href="${link("profile/B")}"><span>02 / ${esc(data.candidates.B.label)}</span><strong>${data.candidates.B.taste}/100</strong><span aria-hidden="true">↗</span></a></div><a class="button button-dark" href="${link("candidates")}">Compare Candidates <span aria-hidden="true">↗</span></a></main>${footer()}`;
  }

  function render() {
    const parts = route();
    const page = parts[0] || "dashboard";
    if (page !== "profile" || state.profileKey !== parts[1]) state.cardSide = "front";
    state.profileKey = page === "profile" ? parts[1] : null;
    let html;
    if (page === "dashboard") html = dashboard();
    else if (page === "job") html = job();
    else if (page === "candidates") html = candidates();
    else if (page === "profile" && ["A", "B"].includes(parts[1])) html = profile(parts[1]);
    else if (page === "decision") html = decision();
    else if (page === "result" && ["A", "B"].includes(parts[1])) html = result(parts[1]);
    else if (page === "identity") html = identity();
    else { location.replace(link("dashboard")); return; }
    app.innerHTML = html;
    document.title = `${page === "dashboard" ? "Recruitment" : page === "profile" ? `Profile ${parts[1]}` : page.charAt(0).toUpperCase() + page.slice(1)} — AESTHETIC / WORK`;
    window.scrollTo(0, 0);
  }

  app.addEventListener("click", (event) => {
    const menu = event.target.closest(".menu-toggle");
    if (menu) {
      const nav = document.getElementById("mobile-nav");
      const expanded = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!expanded));
      menu.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.hidden = expanded;
      return;
    }
    const focus = event.target.closest("[data-focus]");
    if (focus) {
      state.focused = focus.dataset.focus;
      const scroll = window.scrollY;
      app.innerHTML = candidates();
      window.scrollTo(0, scroll);
      return;
    }
    const side = event.target.closest("[data-side]");
    if (side) {
      state.cardSide = side.dataset.side;
      const card = document.querySelector(".identity-card");
      const current = data.candidates[route()[1]];
      if (card && current) card.outerHTML = identityCard(current);
      document.querySelectorAll("[data-side]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.side === state.cardSide)));
      return;
    }
    const hire = event.target.closest("[data-hire]");
    if (hire) location.hash = link(`result/${hire.dataset.hire}`);
  });

  window.addEventListener("hashchange", render);
  render();
})();
