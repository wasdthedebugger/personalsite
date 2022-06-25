#include<stdio.h>
    int main(){
        
        int m=0,n=0,a=0,b=0;
        re:
        printf("Enter number of rows and columns in the first matrix: \n");
        scanf("%d%d", &m,&n);

        printf("Enter number of rows and columns in the second matrix: \n");
        scanf("%d%d", &a,&b);

        int m1[m][n], m2[a][b], m3[m][b];
             

        if(n != a){
            printf("Matrix multiplication is not possible. Try again. \n\n");
            goto re;
        }

        int i,j,k;

        printf("Enter elements for the first matrix.\n");
        for ( i = 0; i < m; i++)
        {
            for ( j = 0; j < n; j++)
            {
                scanf("%d", &m1[i][j]);
            }
        }

        printf("Enter elements for the second matrix.\n");

        for ( i = 0; i < a; i++)
        {
            for ( j = 0; j < b; j++)
            {
                scanf("%d", &m2[i][j]);
            }
        }

        int p = n;
        int product = 0;
        int sum = 0;
        
        for (i = 0; i < m; i++)
	    {
		for (j = 0; j < b; j++)
		{
			for (k = 0; k < p; k++)
			{
				product = m1[i][k] * m2[k][j];
				sum = sum + product;
			}
			m3[i][j] = sum;
			sum = 0;
			product = 0;
		}
	}
    printf("Matrix A: \n");
    for (i = 0; i < m; i++)
    {
        for(j = 0; j<n; j++){
            printf("%d\t", m1[i][j]);
        }
        printf("\n");
    }

    printf("Matrix B: \n");
    for (i = 0; i < a; i++)
    {
        for(j = 0; j < b; j++){
            printf("%d\t", m2[i][j]);
        }
        printf("\n");
    }

    printf("Multiplication: \n");
    for (i = 0; i < m; i++)
    {
        for(j = 0; j < b; j++){
            printf("%d\t", m3[i][j]);
        }
        printf("\n");
    }
        

    return 0;
}