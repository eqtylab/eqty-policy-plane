# Agent Policy Plane

This is a **react component.**

You will import it in your react app to display the policy plane.

```
git clone git@github.com:eqtylab/eqty-policy-plane.git
cd eqty-policy-plane

# Install dependencies
npm install

# link the package, so you can import in other local react apps
npm link
```

### Example usage

**In your react app**

```jsx
// ... other imports
import { AgentPolicyPlane } from "eqty-agent-policy-plane";
import "eqty-agent-policy-plane/dist/styles.css";

const ReactComponentDemo = () => {
  return (
    //... component code (e.g. a header)
    <div
      style={
        {
          // IMPORTANT: The AgentPolicyPlane will with 100% width and height of the parent container
        }
      }
    >
      <AgentPolicyPlane />
    </div>
    // ... component code (e.g. a footer)
  );
};
```
