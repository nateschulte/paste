export const defaultExample = `
const TooltipExample = () => {
  return (
    <Tooltip baseId="tooltip" text="Black Lives Matter. We stand with the Black community.">
      <Button variant="primary">✊ Action</Button>
    </Tooltip>
  );
};

render(
  <TooltipExample />
)
`.trim();

export const rightExample = `
const TooltipRightExample = () => {
  return (
    <Tooltip baseId="tooltip-right" text="Welcome to Paste!" placement="right-start">
      <Button variant="primary">Open Tooltip</Button>
    </Tooltip>
  );
};

render(
  <TooltipRightExample />
)
`.trim();

export const customExample = `
const TooltipCustomExample = () => {
  return (
    <Box display="flex">
      <Text as="span">Tooltip should appear from the icon.</Text>
      <Tooltip baseId="tooltip-custom" text="Welcome to Paste!">
        <Box as="span">
          <InformationIcon decorative={false} title="Open Tooltip" />
        </Box>
      </Tooltip>
    </Box>
  );
};

render(
  <TooltipCustomExample />
)
`.trim();
