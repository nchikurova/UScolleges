# Is College Worth the Debt? Exploring the Value of Higher Education

Link to the project:

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

# Scatter plot: *Median Earnings vs Median Debt*
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

## Limitations & expectations
Not each state has colleges from the US News top 50 list. So, there is a chance that user will not see them. To explore more affordable options further, I would need to create another visualization or think about adding some features to this one.

# Bar chart: *Top Majors across Colleges with Median Earnings above $80,000*
file: `barchart.js`

Initially, I had an idea of creating a stacked bar chart, where each college would be represented as a rectangle and the majors would be portrayed by different colors. However, I realized that there would be too many colors displayed, making it difficult for the viewr to read the visualization. Therefore, I decided to use a simpler approach and create a bar chart to display the top 10 majors across colleges with median earning of more than $80,000.

Firstly, I filtered the data by median earnings value, leaving only the colleges with earnings greater than $80,000, which totalled 46 colleges. Then, I added up the percentage of each major to identify the top 10. These were then filtered and displayed in the bar chart.

# Scatter plot: *Name*
file:`SATchart.js`


------Keep in mind that correlation does not necessarily imply causation, so even if you find a strong negative correlation between SAT scores and unemployment rate, it does not mean that higher SAT scores directly cause lower unemployment rates. There may be other factors at play that affect both SAT scores and employment outcomes.-----

If your research question is specifically focused on whether a high SAT score in general is related to better employment outcomes, then calculating the median of the sum of the percentiles for math, verbal, and writing would serve the question best, as it provides a single value for overall SAT score that you can use to explore the relationship with unemployment rate.

However, if you want to investigate whether individual SAT scores in math, verbal, or writing are more strongly related to employment outcomes, then using the separate percentiles for each subject would be more appropriate. This approach would allow you to explore the relationship between each individual SAT score and unemployment rate separately, and to compare the strength of these relationships.=============

+ not all colleges requite sat scores

# Choosing titles

For the title of the project I chose a question which I beileve will catch the viewer's attention. However, for the visualizations, I selected titles that are clear, concise, and effectively communicate the main message of each visualization, while still leaving it open-ended.





