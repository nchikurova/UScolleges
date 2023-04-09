# Your College Journey: Mapping Options and Opportunities

Link to the project: https://nadezdarodriguez.com/UScolleges/

The following project provides advice and recommendations to a hypothetical high-schooler with limited savings for
college, who hasn’t committed to a major or type of school, but wants to keep debt to a minimum and pay
off student loans within 10 years of graduating. 

Her questions include:
1. What should I major in to make the most money after graduation?
2. Will a high SAT score improve my employment outcomes?
3. Are there more affordable alternatives to the US News top 50 that would get me comparable outcomes?

## Visualizations and their purposes

# Map: *Median Cost of Education by State* 
file: `map.js`

Since the hypothetical high-schooler does not have a particular state in mind, I decided to visualize the median cost of colleges per state, where the cost is represented by color. The darker the shade of the color the higher the median cost of education.

I think it is a good start for exploration to have an idea which states are more or less expensive. The map should also help future student to choose a state for exploring the next visualization: a scatter plot on the right side of the map.

## Limitations & expectations
Some of the datapoints are missing, and there are different colleges with both low and very high costs in each state. Therefore, the median costs in each state are closer to each other than I expected. For example, I would expect California to have a higher median cost value than most states; however, the value is only around $12,000 while Vermont's median cost is around $18,000. For deeper analysis of the median cost, we should probably look at the number of colleges in each state and also fill in the null values.

# Bubble chart: *Median Earnings vs Median Debt*
file: `bubble.js`

This visualization should help explore the following concerns:
- Limited savings
- Minimum debt
- Paying off student loan within 10 years of graduation
- More affordable alternatives to the US News top 50

Since student loan rates depend on many factors such as college, state, and requirements from student loans companies, every dept/loan will be paid off in a different period of time. Therefore, for my next visualization, I decided to compare the median earnings and median debt in colleges per state. The user has a choice of the amount of debt they want to explore and how this amount will relate to the median earnings in each university. In this case, user will have an ability to choose the ratio between debt and future earnings.

Initially, I filtered the data only by state and tried to make the size of the circles correspond to the cost of college. Because of the large amount of overlapping circles the visualization looked cluttered and it was hard to hover over the circles to read additional information about each college. The different size of the circles didn't help either: there are many null values for cost of the colleges, but I did not want to exclude these data points from the chart.

So, the next step was to sort data by the amount of debt. I think there are just enough circles per selection on the page, so it is easier for the user to explore their options.

Finally, I colored the US News top 50 data points with red, so the user can see other colleges next to these data points that could be more affordable with the same potential income.

*The link to the US News top 50 colleges shows best colleges of 2023, as an example.

## Limitations & expectations
Not each state has colleges from the US News top 50 list. So, there is a chance that user will not see them. To explore more affordable options further, I would need to create another visualization or think about adding some features to this one.

# Bar chart: *Top Majors across Colleges with Median Earnings above $80,000*
file: `barchart.js`

Initially, I had an idea of creating a stacked bar chart, where each college would be represented as a rectangle and the majors would be portrayed by different colors. However, I realized that there would be too many colors displayed, making it difficult for the viewr to read the visualization. Therefore, I decided to use a simpler approach and create a bar chart to display the top 10 majors across colleges with median earning of more than $80,000.

Firstly, I filtered the data by median earnings value, leaving only the colleges with earnings greater than $80,000, which totalled 46 colleges. Then, I added up the percentage of each major to identify the top 10. These were then filtered and displayed in the bar chart.

# Scatter plot: *Name*
file:`SATchart.js` includes two scatter plots

To determine whether a high SAT score could lead to better employment outcomes, I computed the average Midpoint SAT score across the three subjects: math, verbal, and writing and created a chart that shows the relationship between the average SAT score and unemployment rate. I also created a scatter plot alongside this chart to demonstrate the correlation between SAT scores and future earnings. This would be a useful reference for prospective students.

The correlation between SAT scores and unemployment rates is generally negative, suggesting that a higher SAT score may increase a student's chances of securing employment after college. Additionally, it appears that Math and Verbal SAT scores have a greater impact on employment status than Writing SAT scores.

However, correlation does not imply causation. A strong negative correlation between SAT scores and unemployment rates does not necessarily mean that higher SAT scores directly cause lower unemployment rates. Other factors may be at play that affect both SAT scores and employment outcomes.

Further analysis of this relationship would depend on the research question. If the focus is on whether a higher SAT score in general leads to better employment outcomes, calculating the median of the sum of the percentiles for math, verbal, and writing would be the most relevant approach.

On the other hand, if we want to explore the relationship between each individual SAT score and unemployment rate separately and compare the strength of these relationships, we would need to investigate whether individual SAT scores in math, verbal, or writing are more strongly associated with employment outcomes, using separate percentiles for each subject.

Lastly, it is important to note that not all colleges require SAT scores, which should also be considered when evaluating the relationship between SAT scores and employment outcomes.

## Limitations & extended solution

If I had more time, I would create interactive charts that allow users to select different SAT subjects and explore the relationship between unemployment rates and the average SAT scores for each subject. Another approach would be to filter the data by percentiles (25th, midpoint, and 75th) and calculate the average score across all three subjects. This would enable users to examine the relationship between each individual score and unemployment rate.

Additional Data Analysis and Wrangling can be found in [Jupyter Notebook](/data/Wrangling%20College%20dataset.ipynb).





