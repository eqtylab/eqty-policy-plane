# Agent Policy Plane

This is a **react component.**

You will import it in your react app to display the policy plane.

### Installation

```bash
git clone git@github.com:eqtylab/eqty-policy-plane.git
cd eqty-policy-plane

# Install dependencies
npm install

# Build the package
npm run build

# link the package, so you can import in other local react apps
npm link
```

### Example usage

**In your react app**

or use demo here: [example-app](https://github.com/eqtylab/example-app)

```jsx
// import the component AND the styles
import { AgentPolicyPlaneApplication } from "eqty-agent-policy-plane";
import "eqty-agent-policy-plane/dist/styles.css";

const ReactComponentDemo = () => {
  return (
    <div
      style={
        {
          // IMPORTANT: The AgentPolicyPlaneApplication will with 100% width and height of the parent container
        }
      }
    >
      <AgentPolicyPlaneApplication />
    </div>
  );
};
```
