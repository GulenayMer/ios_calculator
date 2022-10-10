const form = document.getElementById("calculator_form");

form.addEventListener("submit", (e) => {
 e.preventDefault();
});

const output = document.getElementById("output");
const operand = document.querySelectorAll("button[data-type=operand]");

let is_operator = false;

operand.forEach((operand_btn) => {
	operand_btn.addEventListener("click", (e) => {
		remove_active();
    	if (output.value == "0")
		{
    		output.value = e.target.value;
    	}
		else if (output.value.includes("."))
		{
    		output.value = output.value + "" + e.target.value.replace(".", "");
    	}
		else if (is_operator)
		{
      		is_operator = false;
      		output.value = e.target.value;
    	}
		else
		{
    		output.value = output.value + "" + e.target.value;
    	}
  	});
});

const operator = document.querySelectorAll("button[data-type=operator]");

let equation = [];

operator.forEach((operator_btn) => {
	operator_btn.addEventListener("click", (e) => {
		remove_active();
		e.currentTarget.classList.add("active");

		switch (e.target.value)
		{
			case "%":
				output.value = parseFloat(output.value);
				break;
			case "invert":
				output.value = parseFloat(output.value) * -1;
				break;
			case "=":
				equation.push(output.value);
				output.value = eval(equation.join(""));
				equation = [];
				break;
			default:
				let last_item = equation[equation - 1];
				if (["/", "*", "+", "-"].includes(last_item) && is_operator)
				{
					equation.pop();
					equation.push(e.target.value);
				}
				else
				{
					equation.push(output.value);
					equation.push(e.target.value);
				}
				is_operator = true;
				break;
		}
	});
});

const remove_active = () => {
	operator.forEach((operator_btn) => {
	 operator_btn.classList.remove("active");
	});
};