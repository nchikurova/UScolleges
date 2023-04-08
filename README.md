# Is College Worth the Debt? Exploring the Value of Higher Education

Link to the project:

The following project provides advice and recommendations to a hypothetical high-schooler with limited savings for
college, who hasn’t committed to a major or type of school, but wants to keep debt to a minimum and pay
off student loans within 10 years of graduating. 

Her questions include:
1. What should I major in to make the most money after graduation?
2. Will a high SAT score improve my employment outcomes?
3. Are there more affordable alternatives to the US News top 50 that would get me comparable outcomes?

## Visualizations and their purpose

## Map: *Name* 
file: `map.js`

Since the hypothetical high-schooler does not have a particular state in mind, I decided to visualize the median cost of colleges per state, where the cost is represented by color. The darker the shade of the color the higher the median cost of education.

I think it is a good start for exploration to have an idea which states are more or less expensive. The map should also help future student to choose a state for exploring the next visualization: a scatter plot on the right side of the map.

# Limitations & expectations
Some of the datapoints are missing, and there are different colleges with both low and very high costs in each state. Therefore, the median costs in each state are closer to each other than I expected. For example, I would expect California to have a higher median cost value than most states; however, the value is only around $12,000 while Vermont's median cost is around $18,000. For deeper analysis of the median cost, we should probably look at the number of colleges in each state and also fill in the null values.

## Scatter plot: *Name*
file: `bubble.js`

This visualization should help explore the following concerns:
- Limited savings
- Minimum debt
- Paying off student loan within 10 years of graduation
- More affordable alternatives to the US News top 50

Since student loan rates depend on many factors such as college, state, and requirements from student loans companies, every dept/loan will be paid off in a different period of time. Therefore, for my next visualization, I decided to compare the median earnings and median debt in colleges per state. The user has a choice of the amount of debt they want to explore and how this amount will relate to the median earnings in each university. In this case, user will have an ability to choose the ratio between debt and future earnings.

Initially, I filtered the data only by state and tried to make the size of the circles correspond to the cost of college. Because of the large amount of overlapping circles the visualization looked cluttered and it was hard to hover over the circles to read additional information about each college (see screenshots below). The different size of the circles didn't help either: there are many null values for cost of the colleges, but I did not want to exclude these data points from the chart.

![](cluttered_chart1.png) ![](cluttered_chart2.png)

So, the next step was to sort data by the amount of debt. I think there are just enough circles per selection on the page, so it is easier for the user to explore their options.

Finally, I colored the US News top 50 data points with red, so the user can see other colleges next to these data points that could be more affordable with the same potential income.

# Limitations & expectations
Not each state has colleges from the US News top 50 list. So, there is a chance that user will not see them. To explore more affordable options further, I would need to create another visualization or think about adding some features to this one.

## Barchart: *Name*
file: `barchart.js`




