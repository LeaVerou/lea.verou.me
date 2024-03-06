---
title: Web Standards Work
includes: '<script type=module src="/standards/time-line.js"></script>'
toc: true
page_css: true
---
{% macro print_status (ref) -%}
{% set status = ref if ref.id else proposal_meta.statuses[ref] %}
{%- if status -%}
<span class="tech-status {{ status.id }}">{{ status.name }}</span>
{%- else -%}
<span class="tech-status {{ ref }}">{{ ref | capitalize }}</span>
{%- endif %}
{%- endmacro %}

{% macro print_milestone (milestone) %}
{% set milestone_title = milestone.title %}
{% if not milestone_title %}
	{% set milestone_title -%}
		{{ "WG" if milestone.type == "resolution" }} {{ milestone.type | capitalize }}
		{%- if milestone.type == "shipped" %} in {{ milestone.browser | capitalize }} {{ milestone.version }}{% endif -%}
	{%- endset %}
{% endif %}
{% if milestone.url -%}
[{{ milestone_title | trim | safe }}]({{ milestone.url }}) {% if milestone.by %}_(by {{ milestone.by }})_{% endif %}
{%- else -%}
{{ milestone_title | trim | safe }} {% if milestone.by %}_(by {{ milestone.by | safe }})_{% endif %}
{%- endif %}
: <time datetime="{{ milestone.date }}"></time>
{% endmacro %}

{% macro print_standard (tech, hLevel) %}
<section class="tech {{ tech.status }}">

##{{ "#" if hLevel == 3 }} {{ tech.title | safe }} {{ print_status(tech.status) }}

{{ tech.description | safe }}

<time-line>
{% for milestone in tech.milestones %}
{{ print_milestone(milestone) }}
{% endfor %}
</time-line>
{{ tech.note }}

</section>
{% endmacro %}

<div class=nutshell>
This section contains an overview of my contributions to web standards since 2012.
</div>

## Status legend

<table>
	<thead>
		<tr>
			<th>Status</th>
			<th>Count</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{% for id, status in proposal_meta.statuses %}
		<tr>
			<td>{{ print_status(status) }}</td>
			<td>{{ status.count }}</td>
			<td>{{ status.description }}</td>
		</tr>
		{% endfor %}
	</tbody>
</table>

{% for tech in standards -%}
{% if tech.parts %}
## {{ tech.title | safe }}
{{ tech.description | safe }}
	{% for part in tech.parts -%}
	{{ print_standard(part, 3) }}
	{%- endfor %}
{% else -%}
{{ print_standard(tech) }}
{%- endif %}

{%- endfor %}