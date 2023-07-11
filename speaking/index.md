---
title: Speaking
mavo: true
---

**Note:** I am currently extremely selective about the speaking engagements I accept, so I can focus on [my research at MIT](http://lea.verou.me/2014/02/im-going-to-mit/).
If you want me to speak at your event, I require all expenses to be covered, plus a honorarium, determined on a case by case basis.
To invite me to speak, please drop me a line at lea〖@〗verou.me.

<div class="talks" mv-app="" mv-storage="https://github.com/leaverou/leaverou.github.io/data.json">
	<h2>[count(talk)] sessions at [count(event)] events ([count(upcoming)] events upcoming)</h2>
	<div class="mv-bar mv-ui" mv-bar="no-clear"></div>
	<article mv-multiple="" property class="event" mv-order="desc">
		<p class="date"><time property="date"></time></p>
		<div class="content">
			<meta property="upcoming" content="[gt(date, $now)]"/>
			<h2 class="talk" mv-multiple="" property="talk">
				<span property="title" mv-default="">TBD</span>
				<span property="" class="type" mv-edit="#talk-type" mv-editor="#talk-type">
				</span>
				<a property="" class="video" target="_blank" rel="noopener noreferrer">Video</a>
				<a property="" class="slides" target="_blank" rel="noopener noreferrer">Slides</a>
			</h2>
			<p class="venue">
				<a property="url" target="_blank" rel="noopener noreferrer">
					<span property="name"></span>
				</a>
			</p>
			<address class="flag-[country]">
				<span property="city"></span>,
				<span property="country" mv-edit="#countries" mv-editor="#countries"></span>
			</address>
			<p class="comment" property=""></p>
			<p class="comment" style="display: [if(feedback, block, none)]">
				<a property="feedback" target="_blank" rel="noopener noreferrer">Feedback</a>
			</p>
		</div>
	</article>
</div>

<div hidden="" mv-app="" mv-init="https://projects.verou.me/countries.json">
	<select id="countries">
		<option value="online">Online</option>
		<option value="[code]" property="country" mv-multiple="" typeof="">[name]</option>
	</select>
	<select id="talk-type">
		<option selected>Talk</option>
		<option>Keynote</option>
		<option>Workshop</option>
		<option>Panel</option>
		<option>Round Table</option>
		<option>Paper</option>
		<option>Tutorial</option>
	</select>
</div>